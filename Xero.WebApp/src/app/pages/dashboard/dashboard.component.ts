import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DxChartModule, DxPieChartModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { ResultViewerService } from '../../core/services/result-viewer.service';
import { NrtRunSummary } from '../../core/models/nrt.models';

interface DashboardStats {
  totalRuns: number;
  passRate: number;
  totalDiffs: number;
  lastRunPassed: boolean | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DxChartModule, DxPieChartModule, DxLoadIndicatorModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading = true;
  runs: NrtRunSummary[] = [];
  recentRuns: NrtRunSummary[] = [];

  stats: DashboardStats = { totalRuns: 0, passRate: 0, totalDiffs: 0, lastRunPassed: null };

  passFailData: { status: string; count: number }[] = [];
  runsPerDayData: { date: string; runs: number; passed: number; failed: number }[] = [];

  constructor(private viewer: ResultViewerService) {}

  ngOnInit(): void {
    this.viewer.getRuns(1, 100).subscribe({
      next: result => {
        this.runs = result.items;
        this.recentRuns = result.items.slice(0, 6);
        this.buildStats();
        this.buildCharts();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  private buildStats(): void {
    const completed = this.runs.filter(r => r.passed !== null);
    const passed    = completed.filter(r => r.passed === true).length;
    this.stats = {
      totalRuns:     this.runs.length,
      passRate:      completed.length ? Math.round((passed / completed.length) * 100) : 0,
      totalDiffs:    this.runs.reduce((s, r) => s + (r.diffRowCount ?? 0), 0),
      lastRunPassed: this.runs[0]?.passed ?? null,
    };
  }

  private buildCharts(): void {
    const passed = this.runs.filter(r => r.passed === true).length;
    const failed = this.runs.filter(r => r.passed === false).length;
    const pending = this.runs.filter(r => r.passed === null).length;
    this.passFailData = [
      { status: 'Pass',    count: passed  },
      { status: 'Fail',    count: failed  },
      { status: 'Running', count: pending },
    ].filter(d => d.count > 0);

    // Aggregate runs per day (last 14 days)
    const buckets = new Map<string, { runs: number; passed: number; failed: number }>();
    for (const run of this.runs) {
      const day = run.runTimestamp.substring(0, 10);
      const b   = buckets.get(day) ?? { runs: 0, passed: 0, failed: 0 };
      b.runs++;
      if (run.passed === true)  b.passed++;
      if (run.passed === false) b.failed++;
      buckets.set(day, b);
    }
    this.runsPerDayData = [...buckets.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, v]) => ({ date, ...v }));
  }

  passFailColor = (arg: { argument: string }) => {
    const map: Record<string, string> = { Pass: '#3ecf8e', Fail: '#f66d6d', Running: '#f5a623' };
    return { color: map[arg.argument] ?? '#4f8ef7' };
  };

  formatDay = (arg: { valueText: string }) => arg.valueText.slice(5);

  formatPieLabel = (arg: { percentText: string; argument: string }) =>
    `${arg.argument}: ${arg.percentText}`;
}
