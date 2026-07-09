package com.xero.webapi.service;

import com.xero.webapi.model.NrtRunDefinitionDto;
import com.xero.webapi.model.NrtRunRequest;
import com.xero.webapi.model.RunExecutionResponse;
import com.xero.webapi.pipeline.NrtPipelineRunner;
import com.xero.webapi.pipeline.PipelineCounts;
import com.xero.webapi.repository.NrtRunDefinitionRepository;
import com.xero.webapi.repository.RunExecutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * Orchestrates a single NRT run end-to-end:
 *
 * <ol>
 *   <li>Resolves a {@link NrtRunDefinitionDto} (when {@code DefinitionId} is set) and merges its
 *       fields into the request — definition values overwrite caller payload for everything except
 *       {@code ValuationDate}, and command lines are filled only when the caller left them null.</li>
 *   <li>Inserts the {@code nrt_run_executions} header row with status {@code pending}.</li>
 *   <li>If pre-execution command lines are present, runs them concurrently while writing per-side
 *       status; aborts the run if either fails.</li>
 *   <li>Delegates the compare + save phases to a {@link NrtPipelineRunner} and writes status
 *       transitions through the {@code onPhase} callback.</li>
 *   <li>Finalises the row with row counts + pass/fail and returns a synchronous response.</li>
 * </ol>
 *
 * <p>Any unhandled exception triggers a best-effort {@code status=failed} write before being
 * rethrown, so the persisted record always reflects the terminal state.
 */
@Service
public class NrtService {

    private static final Logger log = LoggerFactory.getLogger(NrtService.class);

    private final RunExecutionRepository     runRepository;
    private final NrtRunDefinitionRepository definitionRepository;
    private final CommandRunner              commandRunner;
    private final NrtPipelineRunner          pipelineRunner;

    public NrtService(RunExecutionRepository runRepository,
                      NrtRunDefinitionRepository definitionRepository,
                      CommandRunner commandRunner,
                      NrtPipelineRunner pipelineRunner) {
        this.runRepository        = runRepository;
        this.definitionRepository = definitionRepository;
        this.commandRunner        = commandRunner;
        this.pipelineRunner       = pipelineRunner;
    }

    public RunExecutionResponse executeRun(NrtRunRequest request) {
        var runTimestamp = OffsetDateTime.now(ZoneOffset.UTC);
        long startNanos  = System.nanoTime();

        // Step 0 — merge definition fields when a DefinitionId was supplied.
        if (request.getDefinitionId() != null) {
            NrtRunDefinitionDto def = definitionRepository.getById(request.getDefinitionId());
            if (def != null) {
                request.setScenarioName(def.getScenarioName());
                request.setReferenceVersion(def.getReferenceVersion());
                request.setTargetVersion(def.getTargetVersion());
                request.setReference(def.getReference());
                request.setTarget(def.getTarget());
                request.setCompare(def.getCompare());
                request.setOutput(def.getOutput());
                request.setColumnSchema(def.getColumnSchema());
                if (request.getRefCommandLine() == null) {
                    request.setRefCommandLine(def.getRefCommandLine());
                }
                if (request.getTargetCommandLine() == null) {
                    request.setTargetCommandLine(def.getTargetCommandLine());
                }
            }
        }

        // Step 1 — create the execution header (status=pending) and bind run_id to the MDC.
        int runId = runRepository.createRun(request, runTimestamp);
        MDC.put("runId", Integer.toString(runId));

        try {
            // Step 2 — pre-execution commands (concurrent), short-circuit on failure.
            boolean hasRefCmd = isNonBlank(request.getRefCommandLine());
            boolean hasTgtCmd = isNonBlank(request.getTargetCommandLine());

            if (hasRefCmd || hasTgtCmd) {
                runRepository.setStatus(runId, "running_commands", null);

                CompletableFuture<Boolean> refTask = hasRefCmd
                        ? CompletableFuture.supplyAsync(() -> runCommandWithTracking(
                                runId, "ref", request.getRefCommandLine()))
                        : CompletableFuture.completedFuture(true);

                CompletableFuture<Boolean> tgtTask = hasTgtCmd
                        ? CompletableFuture.supplyAsync(() -> runCommandWithTracking(
                                runId, "tgt", request.getTargetCommandLine()))
                        : CompletableFuture.completedFuture(true);

                boolean refOk;
                boolean tgtOk;
                try {
                    CompletableFuture.allOf(refTask, tgtTask).join();
                    refOk = refTask.get();
                    tgtOk = tgtTask.get();
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                    throw new IllegalStateException("Pre-execution commands interrupted.", ex);
                } catch (ExecutionException ex) {
                    throw new IllegalStateException("Pre-execution command failed.",
                            ex.getCause() == null ? ex : ex.getCause());
                }

                if (!refOk || !tgtOk) {
                    var msg = "Pre-execution command(s) failed — see ref_cmd_error / tgt_cmd_error for details.";
                    runRepository.setStatus(runId, "failed", msg);
                    throw new IllegalStateException(msg);
                }
            }

            // Step 3 — schema sanity check (the placeholder runner depends on this contract too).
            if (request.getColumnSchema() == null || request.getColumnSchema().length == 0) {
                throw new IllegalStateException("ColumnSchema must contain at least one column.");
            }

            // Step 4 — (the .NET implementation reflectively builds a row type here; the Java port
            // delegates to a runner instead, so there is nothing to do at this step.)

            // Step 5 — comparison + saving via the pipeline runner.
            runRepository.setStatus(runId, "running_comparison", null);
            PipelineCounts counts = pipelineRunner.run(request, runId, runTimestamp, phase -> {
                if ("running_comparison".equals(phase)) {
                    runRepository.setComparisonStarted(runId);
                } else if ("saving_results".equals(phase)) {
                    runRepository.setSavingStarted(runId);
                } else {
                    log.debug("Ignoring unrecognised pipeline phase token: {}", phase);
                }
            });

            // Step 6 — finalise the header and build the synchronous response.
            boolean passed = counts.diffCount() == 0
                          && counts.onlyRefCount() == 0
                          && counts.onlyTgtCount() == 0;
            runRepository.setCompleted(runId,
                    counts.refCount(), counts.tgtCount(), counts.diffCount(),
                    counts.onlyRefCount(), counts.onlyTgtCount(), passed);

            double durationSeconds = (System.nanoTime() - startNanos) / 1_000_000_000.0;
            log.info("Run {} completed in {}s — passed={}, diff={}, onlyRef={}, onlyTgt={}",
                    runId, String.format("%.2f", durationSeconds), passed,
                    counts.diffCount(), counts.onlyRefCount(), counts.onlyTgtCount());

            return buildResponse(request, runId, runTimestamp, counts, passed, durationSeconds);
        } catch (RuntimeException ex) {
            try {
                runRepository.setStatus(runId, "failed", ex.getMessage());
            } catch (RuntimeException secondary) {
                log.warn("Failed to mark run {} as failed after primary error", runId, secondary);
            }
            throw ex;
        } finally {
            MDC.remove("runId");
        }
    }

    private boolean runCommandWithTracking(int runId, String side, String commandLine) {
        var startedAt = OffsetDateTime.now(ZoneOffset.UTC);
        writeCommandStatus(runId, side, "running", startedAt, null, null, null);

        CommandRunner.CommandResult result = commandRunner.run(commandLine);

        var finishedAt = OffsetDateTime.now(ZoneOffset.UTC);
        if (result.succeeded()) {
            writeCommandStatus(runId, side, "completed", startedAt, finishedAt, result.exitCode(), null);
        } else {
            writeCommandStatus(runId, side, "failed", startedAt, finishedAt,
                    result.exitCode(), result.stderr());
        }
        return result.succeeded();
    }

    private void writeCommandStatus(int runId, String side, String status,
                                    OffsetDateTime startedAt, OffsetDateTime finishedAt,
                                    Integer exitCode, String error) {
        if ("ref".equals(side)) {
            runRepository.setRefCommandStatus(runId, status, startedAt, finishedAt, exitCode, error);
        } else {
            runRepository.setTgtCommandStatus(runId, status, startedAt, finishedAt, exitCode, error);
        }
    }

    private static RunExecutionResponse buildResponse(NrtRunRequest request, int runId,
                                                      OffsetDateTime runTimestamp,
                                                      PipelineCounts counts,
                                                      boolean passed, double durationSeconds) {
        var resp = new RunExecutionResponse();
        resp.setRunId(runId);
        resp.setScenarioName(request.getScenarioName());
        resp.setReferenceVersion(request.getReferenceVersion());
        resp.setTargetVersion(request.getTargetVersion());
        resp.setValuationDate(request.getValuationDate());
        resp.setRunTimestamp(runTimestamp);
        resp.setRefRowCount(counts.refCount());
        resp.setTgtRowCount(counts.tgtCount());
        resp.setDiffRowCount(counts.diffCount());
        resp.setOnlyInRefCount(counts.onlyRefCount());
        resp.setOnlyInTgtCount(counts.onlyTgtCount());
        resp.setPassed(passed);
        resp.setDurationSeconds(durationSeconds);
        resp.setStatus("completed");
        return resp;
    }

    private static boolean isNonBlank(String s) {
        return s != null && !s.isBlank();
    }
}
