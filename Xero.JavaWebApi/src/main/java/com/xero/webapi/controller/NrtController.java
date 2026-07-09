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
 * Public NRT execution surface — matches the .NET {@code NrtController} one-for-one.
 *
 * <p>Reads bypass the read service and hit {@link RunExecutionRepository} directly, the same way
 * the .NET source does, so the GET endpoints stay schema-cheap.
 */
@RestController
@RequestMapping("/api/nrt")
public class NrtController {

    private final NrtService              nrtService;
    private final RunExecutionRepository  runRepository;

    public NrtController(NrtService nrtService, RunExecutionRepository runRepository) {
        this.nrtService    = nrtService;
        this.runRepository = runRepository;
    }

    @PostMapping("/runs")
    public ResponseEntity<?> executeRun(@Valid @RequestBody NrtRunRequest request) {
        String missing = validateConnections(request);
        if (missing != null) {
            return ResponseEntity.badRequest().body(Map.of("error", missing));
        }
        RunExecutionResponse response = nrtService.executeRun(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/runs")
    public PagedResult<?> listRuns(@RequestParam(defaultValue = "1") int page,
                                   @RequestParam(defaultValue = "20") int pageSize) {
        page     = Math.max(1, page);
        pageSize = Math.min(200, Math.max(1, pageSize));
        var items = runRepository.getRuns(page, pageSize);
        int total = runRepository.count();
        return new PagedResult<>(items, total, page, pageSize);
    }

    @GetMapping("/runs/{runId}")
    public ResponseEntity<?> getRun(@PathVariable int runId) {
        RunExecutionSummary summary = runRepository.getRun(runId);
        if (summary == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Run " + runId + " not found."));
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
