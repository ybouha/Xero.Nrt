package com.xero.webapi.service;

import com.xero.webapi.model.NrtRunDefinitionDto;
import com.xero.webapi.model.NrtRunDefinitionSummary;
import com.xero.webapi.model.SaveNrtRunDefinitionRequest;
import com.xero.webapi.repository.NrtRunDefinitionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

/**
 * Thin pass-through over {@link NrtRunDefinitionRepository}. Retries and
 * connection-pool concerns live at the repository layer; this exists so the
 * controller binds to a service abstraction the same way the .NET source did.
 */
@Service
public class NrtRunDefinitionService {

    private final NrtRunDefinitionRepository repo;

    public NrtRunDefinitionService(NrtRunDefinitionRepository repo) {
        this.repo = repo;
    }

    public List<NrtRunDefinitionSummary> getAll() {
        return repo.getAll();
    }

    public NrtRunDefinitionDto getById(UUID id) {
        return repo.getById(id);
    }

    public UUID create(SaveNrtRunDefinitionRequest req) {
        return repo.create(req);
    }

    public boolean update(UUID id, SaveNrtRunDefinitionRequest req) {
        return repo.update(id, req);
    }

    public boolean delete(UUID id) {
        return repo.softDelete(id);
    }
}
