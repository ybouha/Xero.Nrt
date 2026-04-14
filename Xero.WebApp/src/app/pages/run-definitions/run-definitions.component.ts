import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  DxDataGridModule,
  DxPopupModule,
  DxButtonModule,
  DxTextBoxModule,
  DxLoadIndicatorModule,
} from 'devextreme-angular';
import { NrtApiService } from '../../core/services/nrt-api.service';
import {
  ExecuteFromDefinitionRequest,
  NrtRunDefinitionSummary,
  RunExecutionResponse,
} from '../../core/models/nrt.models';

@Component({
  selector: 'app-run-definitions',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    DxDataGridModule, DxPopupModule, DxButtonModule,
    DxTextBoxModule, DxLoadIndicatorModule,
  ],
  templateUrl: './run-definitions.component.html',
  styleUrls: ['./run-definitions.component.scss'],
})
export class RunDefinitionsComponent implements OnInit {
  loading = true;
  definitions: NrtRunDefinitionSummary[] = [];
  highlightedDefinitionId: string | null = null;

  // Execute popup
  executeVisible    = false;
  executeTarget: NrtRunDefinitionSummary | null = null;
  valuationDate     = '';
  executing         = false;
  executeError      = '';

  // Delete confirm popup
  deleteVisible = false;
  deleteTarget: NrtRunDefinitionSummary | null = null;
  deleting      = false;

  constructor(
    private api: NrtApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.highlightedDefinitionId = params.get('highlight');
    });
    this.loadDefinitions();
  }

  loadDefinitions(): void {
    this.loading = true;
    this.api.getDefinitions().subscribe({
      next: defs => { this.definitions = defs; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  openExecute(def: NrtRunDefinitionSummary, event: MouseEvent): void {
    event.stopPropagation();
    this.executeTarget  = def;
    this.valuationDate  = new Date().toISOString().substring(0, 10);
    this.executeError   = '';
    this.executing      = false;
    this.executeVisible = true;
  }

  confirmExecute(): void {
    if (!this.executeTarget || !this.valuationDate) return;
    this.executing    = true;
    this.executeError = '';
    const req: ExecuteFromDefinitionRequest = { valuationDate: this.valuationDate };
    this.api.executeFromDefinition(this.executeTarget.definitionId, req).subscribe({
      next: (result: RunExecutionResponse) => {
        this.executeVisible = false;
        this.router.navigate(['/run-executions']);
      },
      error: (err) => {
        this.executeError = err?.error?.detail ?? err?.message ?? 'Execution failed.';
        this.executing    = false;
      },
    });
  }

  openDelete(def: NrtRunDefinitionSummary, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteTarget  = def;
    this.deleting      = false;
    this.deleteVisible = true;
  }

  confirmDelete(): void {
    if (!this.deleteTarget) return;
    this.deleting = true;
    this.api.deleteDefinition(this.deleteTarget.definitionId).subscribe({
      next: () => {
        this.deleteVisible = false;
        this.loadDefinitions();
      },
      error: () => { this.deleting = false; },
    });
  }

  editDefinition(def: NrtRunDefinitionSummary, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/run-definitions', def.definitionId, 'edit']);
  }
}
