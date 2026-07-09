package com.xero.webapi.controller;

import com.xero.webapi.model.DiffFilter;
import com.xero.webapi.model.DiffResultDto;
import com.xero.webapi.model.PagedResult;
import com.xero.webapi.model.RunExecutionDto;
import com.xero.webapi.service.NrtResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Read-side surface over executed runs and their diffs. Mirrors the .NET
 * {@code NrtRunsController}.
 */
@RestController
@RequestMapping("/api/runs")
public class NrtRunsController {

    private final NrtResultService resultService;

    public NrtRunsController(NrtResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping
    public PagedResult<RunExecutionDto> listRuns(@RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "20") int pageSize) {
        page     = Math.max(1, page);
        pageSize = Math.min(200, Math.max(1, pageSize));
        return resultService.getRuns(page, pageSize);
    }

    @GetMapping("/{runId}")
    public ResponseEntity<?> getRun(@PathVariable int runId) {
        RunExecutionDto dto = resultService.getRun(runId);
        if (dto == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Run " + runId + " not found."));
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{runId}/diffs")
    public ResponseEntity<?> getDiffsForRun(@PathVariable int runId,
                                            @RequestParam(required = false) String diffType,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "50") int pageSize) {
        if (resultService.getRun(runId) == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Run " + runId + " not found."));
        }

        page     = Math.max(1, page);
        pageSize = Math.min(200, Math.max(1, pageSize));

        var filter = new DiffFilter();
        filter.setDiffType(diffType);
        filter.setPage(page);
        filter.setPageSize(pageSize);

        PagedResult<DiffResultDto> results = resultService.getDiffsForRun(runId, filter);
        return ResponseEntity.ok(results);
    }
}
