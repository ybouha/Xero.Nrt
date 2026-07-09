package com.xero.webapi.pipeline;

import com.xero.webapi.model.NrtRunRequest;

import java.time.OffsetDateTime;
import java.util.function.Consumer;

/**
 * Drives the comparison phase of an NRT execution: fetches both sides via the
 * configured data acquisition layer, runs the smart comparer, and persists the
 * resulting diff set.
 *
 * <p>Implementations must invoke {@code onPhase} as they transition between
 * phases so the orchestrator can update the run-execution row in real time.
 * Recognised phase tokens: {@code "running_comparison"}, {@code "saving_results"}
 * (matching the status values written to {@code nrt_run_executions.status}).
 */
public interface NrtPipelineRunner {

    /**
     * Executes the compare + save phases for one run.
     *
     * @param request       fully-resolved run request (definition fields already merged in)
     * @param runId         primary key of the run-execution row created by the orchestrator
     * @param runTimestamp  UTC timestamp stamped on the run-execution header
     * @param onPhase       called when entering a new phase — the orchestrator updates DB status from this
     * @return per-side and diff counts used to finalise the run
     */
    PipelineCounts run(NrtRunRequest request,
                       int runId,
                       OffsetDateTime runTimestamp,
                       Consumer<String> onPhase);
}
