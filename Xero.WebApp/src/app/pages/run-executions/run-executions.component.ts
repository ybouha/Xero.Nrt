import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  DxDataGridModule,
  DxPopupModule,
  DxButtonModule,
  DxSelectBoxModule,
  DxLoadIndicatorModule,
  DxCircularGaugeModule,
  DxTabsModule,
} from 'devextreme-angular';
import { ResultViewerService } from '../../core/services/result-viewer.service';
import { DiffResultDto, PagedResult, RunExecutionSummary } from '../../core/models/nrt.models';

@Component({
  selector: 'app-run-executions',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    DxDataGridModule, DxPopupModule, DxButtonModule,
    DxSelectBoxModule, DxLoadIndicatorModule,
    DxCircularGaugeModule, DxTabsModule,
  ],
  templateUrl: './run-executions.component.html',
  styleUrls: ['./run-executions.component.scss'],
})
export class RunExecutionsComponent implements OnInit {
  loading    = true;
  runs: RunExecutionSummary[] = [];
  totalCount = 0;
  page       = 1;
  pageSize   = 20;

  // Filters
  statusFilter: string | null = null;
  readonly statusOptions = [
    { value: null,    label: 'All Statuses' },
    { value: 'pass',  label: 'Pass'         },
    { value: 'fail',  label: 'Fail'         },
  ];

  // Detail popup
  detailVisible  = false;
  selectedRun: RunExecutionSummary | null = null;
  diffs: DiffResultDto[]  = [];
  diffsLoading   = false;
  diffTypeFilter: string | null = null;
  readonly diffTypeOptions = [
    { value: null,               label: 'All Types'      },
    { value: 'InBothButDiff',    label: 'In Both (diff)' },
    { value: 'OnlyInReference',  label: 'Only in Ref'    },
    { value: 'OnlyInTarget',     label: 'Only in Target' },
  ];

  // Right-panel stats
  summaryStats = { totalRuns: 0, passRate: 0, totalDiffs: 0, onlyRef: 0, onlyTgt: 0 };

  constructor(private viewer: ResultViewerService, private router: Router) {}

  ngOnInit(): void {
    this.loadRuns();
  }

  loadRuns(): void {
    this.loading = true;
    this.viewer.getRuns(this.page, this.pageSize).subscribe({
      next: (result: PagedResult<RunExecutionSummary>) => {
        this.runs       = this.applyFilter(result.items);
        this.totalCount = result.totalCount;
        this.buildSummary(result.items);
        this.loading    = false;
      },
      error: () => { this.loading = false; }
    });
  }

  private applyFilter(items: RunExecutionSummary[]): RunExecutionSummary[] {
    if (!this.statusFilter) return items;
    return items.filter(r =>
      this.statusFilter === 'pass' ? r.passed === true : r.passed === false);
  }

  private buildSummary(items: RunExecutionSummary[]): void {
    const completed = items.filter(r => r.passed !== null);
    const passed    = completed.filter(r => r.passed === true).length;
    this.summaryStats = {
      totalRuns:  items.length,
      passRate:   completed.length ? Math.round((passed / completed.length) * 100) : 0,
      totalDiffs: items.reduce((s, r) => s + (r.diffRowCount ?? 0), 0),
      onlyRef:    items.reduce((s, r) => s + (r.onlyInRefCount ?? 0), 0),
      onlyTgt:    items.reduce((s, r) => s + (r.onlyInTgtCount ?? 0), 0),
    };
  }

  onStatusFilterChange(val: string | null): void {
    this.statusFilter = val;
    this.loadRuns();
  }

  viewResults(runId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/diff-results'], { queryParams: { runId } });
  }

  goToDefinition(definitionId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/run-definitions'], { queryParams: { highlight: definitionId } });
  }

  onRowClick(e: { data: RunExecutionSummary }): void {
    this.selectedRun    = e.data;
    this.detailVisible  = true;
    this.diffs          = [];
    this.diffTypeFilter = null;
    this.loadDiffs();
  }

  loadDiffs(): void {
    if (!this.selectedRun) return;
    this.diffsLoading = true;
    this.viewer.getDiffsForRun(this.selectedRun.runId, {
      page: 1, pageSize: 100,
      diffType: this.diffTypeFilter ?? undefined,
    }).subscribe({
      next: result => { this.diffs = result.items; this.diffsLoading = false; },
      error: () => { this.diffsLoading = false; }
    });
  }

  onDiffTypeChange(val: string | null): void {
    this.diffTypeFilter = val;
    this.loadDiffs();
  }

  parseDiffs(raw: string | null): { field: string; ref: unknown; tgt: unknown }[] {
    if (!raw) return [];
    try {
      const obj = JSON.parse(raw) as Record<string, { Ref: unknown; Tgt: unknown }>;
      return Object.entries(obj).map(([field, v]) => ({ field, ref: v.Ref, tgt: v.Tgt }));
    } catch { return []; }
  }

  /** CSS class for the workflow status badge. */
  workflowStatusClass(status: string): string {
    switch (status) {
      case 'completed':          return 'wf-completed';
      case 'failed':             return 'wf-failed';
      case 'pending':            return 'wf-pending';
      case 'running_commands':
      case 'running_comparison':
      case 'saving_results':     return 'wf-running';
      default:                   return 'wf-pending';
    }
  }

  /** Human-readable label for the workflow status. */
  workflowStatusLabel(status: string): string {
    switch (status) {
      case 'completed':          return 'Completed';
      case 'failed':             return 'Failed';
      case 'pending':            return 'Pending';
      case 'running_commands':   return 'Running cmds';
      case 'running_comparison': return 'Comparing';
      case 'saving_results':     return 'Saving';
      default:                   return status;
    }
  }

  get gaugeColor(): string {
    if (this.summaryStats.passRate >= 80) return '#3ecf8e';
    if (this.summaryStats.passRate >= 50) return '#f5a623';
    return '#f66d6d';
  }

  get passCount(): number { return this.runs.filter(r => r.passed === true).length; }
  get failCount(): number { return this.runs.filter(r => r.passed === false).length; }

  formatTooltip(arg: { valueText: string }) { return `${arg.valueText}%`; }

  isNumeric(v: unknown): boolean { return typeof v === 'number'; }

  calcDelta(ref: unknown, tgt: unknown): number {
    return (tgt as number) - (ref as number);
  }
}
