package com.xero.webapi.service;

import com.xero.webapi.model.DiffFilter;
import com.xero.webapi.model.DiffResultDto;
import com.xero.webapi.model.PagedResult;
import com.xero.webapi.model.RunExecutionDto;
import com.xero.webapi.model.RunExecutionSummary;
import com.xero.webapi.repository.DiffResultRepository;
import com.xero.webapi.repository.RunExecutionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Read-side service over the NRT audit tables.
 *
 * <p>Composes paged envelopes from the underlying repositories: the row data
 * comes from one query and the total count from another, both wrapped in
 * {@link PagedResult} so callers always have enough to paginate the UI.
 */
@Service
public class NrtResultService {

    private final RunExecutionRepository runs;
    private final DiffResultRepository   diffs;

    public NrtResultService(RunExecutionRepository runs, DiffResultRepository diffs) {
        this.runs  = runs;
        this.diffs = diffs;
    }

    // ── Runs ──────────────────────────────────────────────────────────────────

    public PagedResult<RunExecutionDto> getRuns(int page, int pageSize) {
        int total = runs.count();
        List<RunExecutionDto> items = runs.getRuns(page, pageSize).stream()
                .map(NrtResultService::toDto)
                .toList();
        return new PagedResult<>(items, total, page, pageSize);
    }

    public RunExecutionDto getRun(int runId) {
        var summary = runs.getRun(runId);
        return summary == null ? null : toDto(summary);
    }

    // ── Diffs (global) ────────────────────────────────────────────────────────

    public PagedResult<DiffResultDto> getDiffs(DiffFilter filter) {
        int total = diffs.count(null, filter.getDiffType());
        var items = diffs.page(null, filter);
        return new PagedResult<>(items, total, filter.getPage(), filter.getPageSize());
    }

    // ── Diffs (scoped to one run) ─────────────────────────────────────────────

    public PagedResult<DiffResultDto> getDiffsForRun(int runId, DiffFilter filter) {
        int total = diffs.count(runId, filter.getDiffType());
        var items = diffs.page(runId, filter);
        return new PagedResult<>(items, total, filter.getPage(), filter.getPageSize());
    }

    public DiffResultDto getDiff(int id) {
        return diffs.getById(id);
    }

    // RunExecutionDto extends RunExecutionSummary with no extra fields, so this
    // is a straight field copy. Kept as a method so future divergence is local.
    private static RunExecutionDto toDto(RunExecutionSummary s) {
        var dto = new RunExecutionDto();
        dto.setRunId(s.getRunId());
        dto.setRunTimestamp(s.getRunTimestamp());
        dto.setScenarioName(s.getScenarioName());
        dto.setReferenceVersion(s.getReferenceVersion());
        dto.setTargetVersion(s.getTargetVersion());
        dto.setValuationDate(s.getValuationDate());
        dto.setRefRowCount(s.getRefRowCount());
        dto.setTgtRowCount(s.getTgtRowCount());
        dto.setDiffRowCount(s.getDiffRowCount());
        dto.setOnlyInRefCount(s.getOnlyInRefCount());
        dto.setOnlyInTgtCount(s.getOnlyInTgtCount());
        dto.setPassed(s.getPassed());
        dto.setColumnSchemaJson(s.getColumnSchemaJson());
        dto.setStatus(s.getStatus());
        dto.setErrorMessage(s.getErrorMessage());
        dto.setRefCmdStatus(s.getRefCmdStatus());
        dto.setRefCmdStartedAt(s.getRefCmdStartedAt());
        dto.setRefCmdFinishedAt(s.getRefCmdFinishedAt());
        dto.setRefCmdExitCode(s.getRefCmdExitCode());
        dto.setRefCmdError(s.getRefCmdError());
        dto.setTgtCmdStatus(s.getTgtCmdStatus());
        dto.setTgtCmdStartedAt(s.getTgtCmdStartedAt());
        dto.setTgtCmdFinishedAt(s.getTgtCmdFinishedAt());
        dto.setTgtCmdExitCode(s.getTgtCmdExitCode());
        dto.setTgtCmdError(s.getTgtCmdError());
        dto.setComparisonStartedAt(s.getComparisonStartedAt());
        dto.setSavingStartedAt(s.getSavingStartedAt());
        dto.setFinishedAt(s.getFinishedAt());
        dto.setDefinitionId(s.getDefinitionId());
        return dto;
    }
}
