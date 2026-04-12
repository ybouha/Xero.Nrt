import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxButtonModule,
  DxLoadIndicatorModule,
  DxPopupModule,
} from 'devextreme-angular';
import { ResultViewerService } from '../../core/services/result-viewer.service';
import { DiffResultDto, DiffFilter } from '../../core/models/nrt.models';

@Component({
  selector: 'app-diff-results',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule, DxSelectBoxModule, DxTextBoxModule,
    DxButtonModule, DxLoadIndicatorModule, DxPopupModule,
  ],
  templateUrl: './diff-results.component.html',
  styleUrls: ['./diff-results.component.scss'],
})
export class DiffResultsComponent implements OnInit {
  loading    = true;
  diffs: DiffResultDto[] = [];
  totalCount = 0;

  filter: DiffFilter = { page: 1, pageSize: 50 };
  tradeIdInput = '';
  bookInput    = '';
  deskInput    = '';

  readonly diffTypeOptions = [
    { value: null,              label: 'All Types'       },
    { value: 'InBothButDiff',   label: 'In Both (diff)'  },
    { value: 'OnlyInReference', label: 'Only in Ref'     },
    { value: 'OnlyInTarget',    label: 'Only in Target'  },
  ];

  // Detail popup
  detailVisible    = false;
  selectedDiff: DiffResultDto | null = null;
  parsedDiffs: { field: string; ref: unknown; tgt: unknown }[] = [];

  constructor(private viewer: ResultViewerService) {}

  ngOnInit(): void { this.loadDiffs(); }

  loadDiffs(): void {
    this.loading = true;
    this.viewer.getDiffs(this.filter).subscribe({
      next: result => {
        this.diffs      = result.items;
        this.totalCount = result.totalCount;
        this.loading    = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filter = {
      ...this.filter,
      page:    1,
      tradeId: this.tradeIdInput || undefined,
      book:    this.bookInput    || undefined,
      desk:    this.deskInput    || undefined,
    };
    this.loadDiffs();
  }

  clearFilters(): void {
    this.tradeIdInput = '';
    this.bookInput    = '';
    this.deskInput    = '';
    this.filter       = { page: 1, pageSize: 50 };
    this.loadDiffs();
  }

  onDiffTypeChange(val: string | null): void {
    this.filter = { ...this.filter, diffType: val ?? undefined, page: 1 };
    this.loadDiffs();
  }

  onPageChange(e: { pageIndex: number; pageSize: number }): void {
    this.filter = { ...this.filter, page: e.pageIndex + 1, pageSize: e.pageSize };
    this.loadDiffs();
  }

  openDetail(diff: DiffResultDto): void {
    this.selectedDiff  = diff;
    this.parsedDiffs   = this.parseDiffs(diff.diffs);
    this.detailVisible = true;
  }

  parseDiffs(raw: string | null): { field: string; ref: unknown; tgt: unknown }[] {
    if (!raw) return [];
    try {
      const obj = JSON.parse(raw) as Record<string, { Ref: unknown; Tgt: unknown }>;
      return Object.entries(obj).map(([field, v]) => ({ field, ref: v.Ref, tgt: v.Tgt }));
    } catch { return []; }
  }

  isNumeric(v: unknown): boolean { return typeof v === 'number'; }

  calcDelta(ref: unknown, tgt: unknown): number {
    return (tgt as number) - (ref as number);
  }
}
