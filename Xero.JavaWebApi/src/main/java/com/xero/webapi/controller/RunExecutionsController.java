package com.xero.webapi.controller;

import com.xero.webapi.model.DbSettingsDto;
import com.xero.webapi.model.NrtRunRequest;
import com.xero.webapi.model.PagedResult;
import com.xero.webapi.model.RunExecutionResponse;
import com.xero.webapi.model.RunExecutionSummary;
import com.xero.webapi.repository.RunExecutionRepository;
import com.xero.webapi.service.NrtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Lower-level execution surface — accepts either an inline {@link NrtRunRequest} or a request that
 * carries only a {@code DefinitionId} (in which case the service merges the saved definition).
 * Mirrors the .NET {@code RunExecutionsController}.
 */
@RestController
@RequestMapping("/api/run-executions")
public class RunExecutionsController {

    private final NrtService             nrtService;
    private final RunExecutionRepository runRepository;

    public RunExecutionsController(NrtService nrtService, RunExecutionRepository runRepository) {
        this.nrtService    = nrtService;
        this.runRepository = runRepository;
    }

    @PostMapping
    public ResponseEntity<?> executeRun(@Valid @RequestBody NrtRunRequest request) {
        // Skip ref/tgt validation when a DefinitionId is supplied — the service merges the
        // connection settings from the persisted definition.
        if (request.getDefinitionId() == null) {
            String missing = validateConnections(request);
            if (missing != null) {
                return ResponseEntity.badRequest().body(Map.of("error", missing));
            }
        }
        RunExecutionResponse response = nrtService.executeRun(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public PagedResult<RunExecutionSummary> listRuns(@RequestParam(defaultValue = "1") int page,
                                                     @RequestParam(defaultValue = "20") int pageSize) {
        page     = Math.max(1, page);
        pageSize = Math.min(200, Math.max(1, pageSize));
        var items = runRepository.getRuns(page, pageSize);
        int total = runRepository.count();
        return new PagedResult<>(items, total, page, pageSize);
    }

    @GetMapping("/{runId}")
    public ResponseEntity<?> getRun(@PathVariable int runId) {
        RunExecutionSummary summary = runRepository.getRun(runId);
        if (summary == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", "Run execution " + runId + " not found."));
        }
        return ResponseEntity.ok(summary);
    }

    private static String validateConnections(NrtRunRequest request) {
        DbSettingsDto ref = request.getReference();
        DbSettingsDto tgt = request.getTarget();
        if (ref == null || isBlank(ref.getConnectionString())) {
            return "Reference.ConnectionString is required.";
        }
        if (isBlank(ref.getQuery())) {
            return "Reference.Query is required.";
        }
        if (tgt == null || isBlank(tgt.getConnectionString())) {
            return "Target.ConnectionString is required.";
        }
        if (isBlank(tgt.getQuery())) {
            return "Target.Query is required.";
        }
        return null;
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
