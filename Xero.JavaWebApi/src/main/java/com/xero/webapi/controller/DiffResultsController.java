package com.xero.webapi.controller;

import com.xero.webapi.model.DiffFilter;
import com.xero.webapi.model.DiffResultDto;
import com.xero.webapi.model.PagedResult;
import com.xero.webapi.service.NrtResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Cross-run diff browser. Mirrors the .NET {@code DiffResultsController}.
 */
@RestController
@RequestMapping("/api/diffs")
public class DiffResultsController {

    private final NrtResultService resultService;

    public DiffResultsController(NrtResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping
    public PagedResult<DiffResultDto> listDiffs(@RequestParam(required = false) String diffType,
                                                @RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "50") int pageSize) {
        page     = Math.max(1, page);
        pageSize = Math.min(200, Math.max(1, pageSize));

        var filter = new DiffFilter();
        filter.setDiffType(diffType);
        filter.setPage(page);
        filter.setPageSize(pageSize);

        return resultService.getDiffs(filter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDiff(@PathVariable int id) {
        DiffResultDto dto = resultService.getDiff(id);
        if (dto == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Diff " + id + " not found."));
        }
        return ResponseEntity.ok(dto);
    }
}
