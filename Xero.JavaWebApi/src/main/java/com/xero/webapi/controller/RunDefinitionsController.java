package com.xero.webapi.controller;

import com.xero.webapi.model.ExecuteFromDefinitionRequest;
import com.xero.webapi.model.NrtRunDefinitionDto;
import com.xero.webapi.model.NrtRunDefinitionSummary;
import com.xero.webapi.model.NrtRunRequest;
import com.xero.webapi.model.RunExecutionResponse;
import com.xero.webapi.model.SaveNrtRunDefinitionRequest;
import com.xero.webapi.service.NrtRunDefinitionService;
import com.xero.webapi.service.NrtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * CRUD over saved {@code nrt_run_definitions} plus an "execute by id" shortcut.
 * Mirrors the .NET {@code RunDefinitionsController}.
 */
@RestController
@RequestMapping("/api/run-definitions")
public class RunDefinitionsController {

    private final NrtRunDefinitionService definitionService;
    private final NrtService              nrtService;

    public RunDefinitionsController(NrtRunDefinitionService definitionService,
                                    NrtService nrtService) {
        this.definitionService = definitionService;
        this.nrtService        = nrtService;
    }

    @GetMapping
    public List<NrtRunDefinitionSummary> getAll() {
        return definitionService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        NrtRunDefinitionDto dto = definitionService.getById(id);
        if (dto == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Run definition " + id + " not found."));
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody SaveNrtRunDefinitionRequest request) {
        if (isBlank(request.getName())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name is required."));
        }
        UUID id = definitionService.create(request);
        return ResponseEntity.created(URI.create("/api/run-definitions/" + id))
                .body(Map.of("definitionId", id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,
                                    @Valid @RequestBody SaveNrtRunDefinitionRequest request) {
        if (isBlank(request.getName())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name is required."));
        }
        boolean updated = definitionService.update(id, request);
        if (!updated) {
            return ResponseEntity.status(404).body(Map.of("error", "Run definition " + id + " not found."));
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean removed = definitionService.delete(id);
        if (!removed) {
            return ResponseEntity.status(404).body(Map.of("error", "Run definition " + id + " not found."));
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/execute")
    public ResponseEntity<?> execute(@PathVariable UUID id,
                                     @RequestBody ExecuteFromDefinitionRequest request) {
        if (request == null || isBlank(request.getValuationDate())) {
            return ResponseEntity.badRequest().body(Map.of("error", "ValuationDate is required."));
        }

        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(request.getValuationDate());
        } catch (DateTimeParseException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "ValuationDate must be ISO-8601 (yyyy-MM-dd)."));
        }

        var runRequest = new NrtRunRequest();
        runRequest.setDefinitionId(id);
        runRequest.setValuationDate(parsedDate);

        RunExecutionResponse response = nrtService.executeRun(runRequest);
        return ResponseEntity.ok(response);
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
