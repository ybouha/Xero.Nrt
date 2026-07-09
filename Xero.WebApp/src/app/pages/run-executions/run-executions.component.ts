import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  DxDataGridModule,
  DxButtonModule,
  DxSelectBoxModule,
  DxLoadIndicatorModule,
  DxCircularGaugeModule,
  DxTabsModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ResultViewerService } from '../../core/services/result-viewer.service';
import { PagedResult, RunExecutionSummary, RunLogEntry } from '../../core/models/nrt.models';

/** One NRT pipeline step rendered in the right panel. */
interface PipelineStep {
  label: string;
  statusClass: string;
  startedAt: string | null;
  elapsed: string | null;
  error: string | null;
}

@Component({
  selector: 'app-run-executions',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    DxDataGridModule, DxButtonModule,
    DxSelectBoxModule, DxLoadIndicatorModule,
    DxCircularGaugeModule, DxTabsModule,
    DxPopupModule,
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

  // Right panel
  selectedRun: RunExecutionSummary | null = null;

  // Right-panel stats
  summaryStats = { totalRuns: 0, passRate: 0, totalDiffs: 0, onlyRef: 0, onlyTgt: 0 };

  // ── Inspection popups (queries / scripts / logs) ────────────────────────────
  queriesVisible = false;
  scriptsVisible = false;
  logsVisible    = false;

  logsLoading = false;
  logsError: string | null = null;
  runLogs: RunLogEntry[] = [];

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
    this.selectedRun = e.data;
  }

  // ── Inspection popups ───────────────────────────────────────────────────────

  openQueries(): void { this.queriesVisible = true; }
  openScripts(): void { this.scriptsVisible = true; }

  openLogs(): void {
    const run = this.selectedRun;
    if (!run) return;
    this.logsVisible = true;
    this.loadLogs(run.runId);
  }

  loadLogs(runId: number): void {
    this.logsLoading = true;
    this.logsError   = null;
    this.runLogs     = [];
    this.viewer.getRunLogs(runId).subscribe({
      next: (logs) => { this.runLogs = logs; this.logsLoading = false; },
      error: () => { this.logsError = 'Failed to load logs.'; this.logsLoading = false; },
    });
  }

  logLevelClass(level: string): string {
    switch ((level || '').toLowerCase()) {
      case 'error':
      case 'fatal':   return 'log-error';
      case 'warning': return 'log-warn';
      case 'debug':
      case 'verbose': return 'log-debug';
      default:        return 'log-info';
    }
  }

  /** NRT pipeline steps for the selected run, each with its elapsed time. */
  get pipelineSteps(): PipelineStep[] {
    const r = this.selectedRun;
    if (!r) return [];

    const steps: PipelineStep[] = [];

    if (r.refCmdStatus)
      steps.push(this.buildStep(
        'Reference command', r.refCmdStatus,
        r.refCmdStartedAt, r.refCmdFinishedAt, r.refCmdError));

    if (r.tgtCmdStatus)
      steps.push(this.buildStep(
        'Target command', r.tgtCmdStatus,
        r.tgtCmdStartedAt, r.tgtCmdFinishedAt, r.tgtCmdError));

    steps.push(this.buildStep(
      'Comparison',
      r.savingStartedAt ? 'completed' : (r.comparisonStartedAt ? 'running' : 'pending'),
      r.comparisonStartedAt, r.savingStartedAt, null));

    steps.push(this.buildStep(
      'Save results',
      r.finishedAt ? 'completed' : (r.savingStartedAt ? 'running' : 'pending'),
      r.savingStartedAt, r.finishedAt, null));

    return steps;
  }

  private buildStep(
    label: string, status: string,
    start: string | null | undefined, end: string | null | undefined,
    error: string | null | undefined): PipelineStep {
    return {
      label,
      statusClass: this.stepStatusClass(status),
      startedAt: start ?? null,
      elapsed: this.stepElapsed(start, end),
      error: error ?? null,
    };
  }

  private stepStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'wf-completed';
      case 'failed':    return 'wf-failed';
      case 'running':   return 'wf-running';
      default:          return 'wf-pending';
    }
  }

  /** Formats the duration between two ISO timestamps (e.g. "350 ms", "1.2 s", "1m 5s"). */
  private stepElapsed(start: string | null | undefined, end: string | null | undefined): string | null {
    if (!start || !end) return null;
    const ms = new Date(end).getTime() - new Date(start).getTime();
    if (isNaN(ms) || ms < 0) return null;
    if (ms < 1000)  return `${ms} ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)} s`;
    const m = Math.floor(ms / 60000);
    const s = Math.round((ms % 60000) / 1000);
    return `${m}m ${s}s`;
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
}
