import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxButtonModule,
  DxLoadIndicatorModule,
  DxPopupModule,
  DxListModule,
  DxNumberBoxModule,
  DxTabsModule,
} from 'devextreme-angular';
import { forkJoin } from 'rxjs';
import { ResultViewerService } from '../../core/services/result-viewer.service';
import { DiffResultDto, DiffFilter, NrtRunSummary } from '../../core/models/nrt.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-diff-results',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    DxDataGridModule, DxSelectBoxModule, DxTextBoxModule,
    DxButtonModule, DxLoadIndicatorModule, DxPopupModule,
    DxListModule, DxNumberBoxModule, DxTabsModule,
  ],
  providers: [DecimalPipe],
  templateUrl: './diff-results.component.html',
  styleUrls: ['./diff-results.component.scss'],
})
export class DiffResultsComponent implements OnInit {

  loading      = true;
  runsLoading  = true;
  diffs: DiffResultDto[]   = [];
  runs:  (NrtRunSummary & { label: string })[] = [];
  totalCount   = 0;

  runId: number | null = null;
  filter: DiffFilter = { page: 1, pageSize: 1000 };
  tradeIdInput = '';
  bookInput    = '';
  deskInput    = '';

  // ── Tab state ────────────────────────────────────────────────────────────────
  activeTab = 0;
  tabs: { text: string; badge: string }[] = [
    { text: 'In Both (diff)',    badge: '' },
    { text: 'Only in Reference', badge: '' },
    { text: 'Only in Target',    badge: '' },
  ];

  // ── InBothButDiff grid ───────────────────────────────────────────────────────
  columnDefs: any[] = [];
  flatDiffs:  any[] = [];
  diffFields: string[] = [];

  // ── Orphan grids ─────────────────────────────────────────────────────────────
  orphanColsRef:   any[] = [];
  flatRefOrphans:  any[] = [];
  orphanColsTgt:   any[] = [];
  flatTgtOrphans:  any[] = [];

  // ── Detail popup ─────────────────────────────────────────────────────────────
  detailVisible  = false;
  selectedDiff: DiffResultDto | null = null;
  parsedDiffs: { field: string; ref: unknown; tgt: unknown }[] = [];

  // ── Context menu state ───────────────────────────────────────────────────────
  private activeGrid: any = null;   // grid instance from e.component
  private ctxColumn:  any = null;
  private ctxValue:   any = null;

  filterListVisible       = false;
  filterListItems:        { label: string; value: any }[] = [];
  filterListSelectedKeys: any[] = [];

  decimalVisible    = false;
  decimalInputValue = 4;
  private decimalMap = new Map<string, number>();

  apiQueryVisible = false;
  apiQueryText    = '';

  copyFeedback = '';

  constructor(
    private viewer: ResultViewerService,
    private route:  ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.viewer.getRuns(1, 200).subscribe({
      next: result => {
        this.runs = result.items.map(r => ({
          ...r,
          label: `#${r.runId} — ${r.scenarioName}  (${r.referenceVersion} → ${r.targetVersion})`,
        }));
        this.runsLoading = false;
        // Refresh tab badges now that run summaries are available
        if (this.runId) this.refreshTabBadges();
      },
      error: () => { this.runsLoading = false; },
    });

    this.route.queryParams.subscribe(params => {
      const id   = params['runId'];
      this.runId = id ? +id : null;
      this.activeTab = 0;
      this.resetFilters();
      if (this.runId) {
        this.loadDiffs();
      } else {
        this.clearAllData();
        this.loading = false;
      }
    });
  }

  // ── Data loading ──────────────────────────────────────────────────────────────

  onRunChange(runId: number | null): void {
    this.router.navigate(['/diff-results'], {
      queryParams: runId ? { runId } : {},
      replaceUrl:  true,
    });
  }

  loadDiffs(): void {
    this.loading = true;

    // Build a base filter (common text filters, no diffType).
    // Then issue 3 parallel requests — one per type — so each has its own
    // server-side pagination and we never miss rows because another type
    // consumed all slots in a single combined page.
    const base: DiffFilter = {
      page:     1,
      pageSize: this.filter.pageSize,
      tradeId:  this.filter.tradeId,
      book:     this.filter.book,
      desk:     this.filter.desk,
    };

    const call = (diffType: string) => {
      const f = { ...base, diffType };
      return this.runId
        ? this.viewer.getDiffsForRun(this.runId, f)
        : this.viewer.getDiffs(f);
    };

    forkJoin({
      inBoth:  call('InBothButDiff'),
      onlyRef: call('OnlyInReference'),
      onlyTgt: call('OnlyInTarget'),
    }).subscribe({
      next: ({ inBoth, onlyRef, onlyTgt }) => {
        this.totalCount = inBoth.totalCount + onlyRef.totalCount + onlyTgt.totalCount;

        this.buildDiffGrid(inBoth.items);

        const refResult = this.buildOrphanData(onlyRef.items, 'Reference Values');
        this.flatRefOrphans = refResult.flat;
        this.orphanColsRef  = refResult.cols;

        const tgtResult = this.buildOrphanData(onlyTgt.items, 'Target Values');
        this.flatTgtOrphans = tgtResult.flat;
        this.orphanColsTgt  = tgtResult.cols;

        // Use the exact totals from each API response for the tab badges
        this.tabs = [
          { text: 'In Both (diff)',    badge: String(inBoth.totalCount)  },
          { text: 'Only in Reference', badge: String(onlyRef.totalCount) },
          { text: 'Only in Target',    badge: String(onlyTgt.totalCount) },
        ];

        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  applyFilters(): void {
    this.filter = {
      ...this.filter, page: 1,
      tradeId: this.tradeIdInput || undefined,
      book:    this.bookInput    || undefined,
      desk:    this.deskInput    || undefined,
    };
    this.loadDiffs();
  }

  clearFilters(): void {
    this.resetFilters();
    this.loadDiffs();
  }

  openDetail(diff: any): void {
    // diff may be a flat row — look up the original DTO by id
    const original = this.diffs.find(d => d.id === diff.id) ?? diff as DiffResultDto;
    this.selectedDiff  = original;
    this.parsedDiffs   = this.parseDiffs(original.diffs);
    this.detailVisible = true;
  }

  // ── Build all grid data ───────────────────────────────────────────────────────

  private buildAll(): void {
    const inBoth  = this.diffs.filter(r => r.diffType === 'InBothButDiff');
    const onlyRef = this.diffs.filter(r => r.diffType === 'OnlyInReference');
    const onlyTgt = this.diffs.filter(r => r.diffType === 'OnlyInTarget');

    this.buildDiffGrid(inBoth);

    const refResult = this.buildOrphanData(onlyRef, 'Reference Values');
    this.flatRefOrphans = refResult.flat;
    this.orphanColsRef  = refResult.cols;

    const tgtResult = this.buildOrphanData(onlyTgt, 'Target Values');
    this.flatTgtOrphans = tgtResult.flat;
    this.orphanColsTgt  = tgtResult.cols;

    this.refreshTabBadges();
  }

  private buildDiffGrid(rows: DiffResultDto[]): void {
    const fieldSet = new Set<string>();
    for (const row of rows) {
      for (const d of this.parseDiffs(row.diffs)) fieldSet.add(d.field);
    }
    this.diffFields = Array.from(fieldSet);

    this.flatDiffs = rows.map(row => {
      const flat: any = { ...row };
      for (const d of this.parseDiffs(row.diffs)) {
        const k = this.safeKey(d.field);
        flat[`${k}_ref`]  = d.ref;
        flat[`${k}_tgt`]  = d.tgt;
        if (this.isNumeric(d.ref) && this.isNumeric(d.tgt))
          flat[`${k}_diff`] = this.calcDelta(d.ref, d.tgt);
      }
      return flat;
    });

    this.columnDefs = [
      ...this.buildFixedCols(true),
      ...this.diffFields.map(field => {
        const k = this.safeKey(field);
        return {
          caption: field,
          isBand: true,
          columns: [
            { dataField: `${k}_ref`,  caption: 'Ref',    dataType: 'number', width: 100, cellTemplate: 'numTpl'     },
            { dataField: `${k}_tgt`,  caption: 'Target', dataType: 'number', width: 100, cellTemplate: 'numTpl'     },
            { dataField: `${k}_diff`, caption: 'Diff',   dataType: 'number', width: 100, cellTemplate: 'diffValTpl' },
          ],
        };
      }),
    ];
  }

  private buildOrphanData(rows: DiffResultDto[], bandCaption: string): { flat: any[]; cols: any[] } {
    const fieldSet = new Set<string>();
    for (const row of rows) {
      for (const item of this.parseCompareItems(row.compareItems)) fieldSet.add(item.field);
    }
    const fields = Array.from(fieldSet);

    const flat = rows.map(row => {
      const f: any = { ...row };
      for (const item of this.parseCompareItems(row.compareItems)) {
        f[`ci_${this.safeKey(item.field)}`] = item.value;
      }
      return f;
    });

    const cols: any[] = [...this.buildFixedCols(false)];
    if (fields.length > 0) {
      cols.push({
        caption: bandCaption,
        isBand: true,
        columns: fields.map(field => ({
          dataField: `ci_${this.safeKey(field)}`,
          caption:    field,
          dataType:  'number',
          width:     100,
          cellTemplate: 'numTpl',
        })),
      });
    }

    return { flat, cols };
  }

  /** Fixed identity columns shared by all three grids.
   *  includeDiffType = true only for the InBothButDiff grid (all orphan rows have the same type). */
  private buildFixedCols(includeDiffType: boolean): any[] {
    const cols: any[] = [
      { dataField: 'id',            caption: '#',          width: 60,  cellTemplate: 'idTpl'   },
      { dataField: 'tradeId',       caption: 'Trade ID',   width: 110, cellTemplate: 'monoTpl' },
      { dataField: 'book',          caption: 'Book',       width: 100  },
      { dataField: 'desk',          caption: 'Desk',       width: 90   },
      { dataField: 'riskFactor',    caption: 'Risk Factor',width: 120  },
      { dataField: 'valuationDate', caption: 'Val Date',   width: 90,  cellTemplate: 'monoTpl' },
      { dataField: 'scenarioName',  caption: 'Scenario',   minWidth: 110 },
      { dataField: 'runTimestamp',  caption: 'Run At',     width: 120, cellTemplate: 'tsTpl', sortOrder: 'desc' },
    ];
    if (includeDiffType) {
      cols.splice(6, 0, { dataField: 'diffType', caption: 'Type', width: 120, cellTemplate: 'typeTpl' });
    }
    return cols;
  }

  private refreshTabBadges(): void {
    const run = this.runs.find(r => r.runId === this.runId);
    this.tabs = [
      { text: 'In Both (diff)',    badge: String(run?.diffRowCount   ?? this.flatDiffs.length)      },
      { text: 'Only in Reference', badge: String(run?.onlyInRefCount ?? this.flatRefOrphans.length) },
      { text: 'Only in Target',    badge: String(run?.onlyInTgtCount ?? this.flatTgtOrphans.length) },
    ];
  }

  // ── Context menu ──────────────────────────────────────────────────────────────

  onContextMenuPreparing(e: any): void {
    if (!e.items) e.items = [];
    e.items.length = 0;

    // Capture the grid instance for subsequent action callbacks
    this.activeGrid = e.component;

    if (e.target === 'header') {
      e.items.push(
        { text: 'Best Fit All Columns', icon: 'columnfield', onItemClick: () => this.bestFitAllColumns() },
        { text: 'Best Fit This Column', icon: 'columnfield', disabled: !e.column?.dataField,
          onItemClick: () => this.bestFitColumn(e.column) },
      );
      return;
    }

    if (e.target !== 'content' || e.row?.rowType !== 'data') return;

    this.ctxColumn = e.column ?? null;
    this.ctxValue  = e.column?.dataField != null ? e.row.data[e.column.dataField] : undefined;
    const label    = this.formatCtxValue(this.ctxValue);
    const isNum    = this.isNumericColumn(e.column);
    const hasField = !!e.column?.dataField;

    e.items.push(
      { text: 'Best Fit All Columns',              icon: 'columnfield', onItemClick: () => this.bestFitAllColumns()   },
      { beginGroup: true },
      { text: `Filter: = ${label}`,                icon: 'filter',      disabled: !hasField, onItemClick: () => this.filterByValue('=')  },
      { text: `Filter: ≠ ${label}`,                icon: 'filter',      disabled: !hasField, onItemClick: () => this.filterByValue('<>') },
      { text: 'Filter by list of values…',         icon: 'bulletlist',  disabled: !hasField, onItemClick: () => this.openFilterList()    },
      { text: 'Clear all filters',                 icon: 'clearformat',                      onItemClick: () => this.activeGrid?.clearFilter() },
      { beginGroup: true },
      { text: 'Copy unique values of this column', icon: 'copy',        disabled: !hasField, onItemClick: () => this.copyUniqueValues()  },
      { beginGroup: true },
      { text: 'Set decimal places…',               icon: 'percent',     disabled: !isNum || !hasField, onItemClick: () => this.openDecimalPopup() },
      { beginGroup: true },
      { text: 'Get API query (JSON)',               icon: 'info',                             onItemClick: () => this.openApiQuery()      },
      { beginGroup: true },
      { text: 'Export to Excel (.csv)',             icon: 'xlsxfile',                         onItemClick: () => this.exportToCsv()       },
    );
  }

  // ── Context menu actions ──────────────────────────────────────────────────────

  bestFitAllColumns(): void {
    if (!this.activeGrid) return;
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d')!;

    this.activeGrid.getVisibleColumns()
      .filter((c: any) => !c.isBand && c.dataField)
      .forEach((col: any) => {
        ctx.font = '700 11px sans-serif';
        let maxW = ctx.measureText(col.caption ?? col.dataField ?? '').width + 20;
        ctx.font = '11px "SF Mono","Fira Code",monospace';
        for (const row of this.activeData) {
          const w = ctx.measureText(String(row[col.dataField] ?? '')).width + 20;
          if (w > maxW) maxW = w;
        }
        this.activeGrid.columnOption(col.dataField, 'width', Math.min(Math.ceil(maxW), 280));
      });
  }

  bestFitColumn(col: any): void {
    if (!col?.dataField || !this.activeGrid) return;
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d')!;

    ctx.font = '700 11px sans-serif';
    let maxW = ctx.measureText(col.caption ?? col.dataField).width + 20;
    ctx.font = '11px "SF Mono","Fira Code",monospace';
    for (const row of this.activeData) {
      const w = ctx.measureText(String(row[col.dataField] ?? '')).width + 20;
      if (w > maxW) maxW = w;
    }
    this.activeGrid.columnOption(col.dataField, 'width', Math.min(Math.ceil(maxW), 280));
  }

  filterByValue(op: '=' | '<>'): void {
    if (!this.ctxColumn?.dataField || !this.activeGrid) return;
    this.activeGrid.filter([this.ctxColumn.dataField, op, this.ctxValue]);
  }

  openFilterList(): void {
    if (!this.ctxColumn?.dataField) return;
    const field  = this.ctxColumn.dataField as string;
    const unique = [...new Set(
      this.activeData.map(r => r[field]).filter(v => v != null)
    )].sort((a, b) => typeof a === 'number' ? a - b : String(a).localeCompare(String(b)));

    this.filterListItems        = unique.map(v => ({ label: String(v), value: v }));
    this.filterListSelectedKeys = [...unique];
    this.filterListVisible      = true;
  }

  applyFilterList(): void {
    const field = this.ctxColumn?.dataField;
    if (!field || !this.activeGrid) { this.filterListVisible = false; return; }

    const keys = this.filterListSelectedKeys;
    if (keys.length === 0) {
      this.activeGrid.clearFilter();
    } else if (keys.length === 1) {
      this.activeGrid.filter([field, '=', keys[0]]);
    } else {
      const f: any[] = [];
      keys.forEach((v, i) => { if (i > 0) f.push('or'); f.push([field, '=', v]); });
      this.activeGrid.filter(f);
    }
    this.filterListVisible = false;
  }

  copyUniqueValues(): void {
    if (!this.ctxColumn?.dataField) return;
    const unique = [...new Set(
      this.activeData.map(r => r[this.ctxColumn.dataField]).filter(v => v != null)
    )].sort((a, b) => typeof a === 'number' ? a - b : String(a).localeCompare(String(b)));

    navigator.clipboard.writeText(unique.join('\n')).then(() => {
      this.copyFeedback = `${unique.length} unique values copied`;
      setTimeout(() => (this.copyFeedback = ''), 2500);
    });
  }

  openDecimalPopup(): void {
    if (!this.ctxColumn?.dataField) return;
    this.decimalInputValue = this.decimalMap.get(this.ctxColumn.dataField) ?? 4;
    this.decimalVisible    = true;
  }

  applyDecimalPlaces(): void {
    const field = this.ctxColumn?.dataField as string;
    if (!field) { this.decimalVisible = false; return; }
    const p = Math.max(0, Math.min(10, this.decimalInputValue));
    this.decimalMap.set(field, p);

    // Rebuild all three column sets to trigger Angular change detection
    const touch = (cols: any[]) => cols.map(col => {
      if (col.isBand) {
        return { ...col, columns: col.columns.map((s: any) =>
          s.dataField === field ? { ...s, _d: p } : s) };
      }
      return col.dataField === field ? { ...col, _d: p } : col;
    });

    this.columnDefs    = touch(this.columnDefs);
    this.orphanColsRef = touch(this.orphanColsRef);
    this.orphanColsTgt = touch(this.orphanColsTgt);
    this.decimalVisible = false;
  }

  openApiQuery(): void {
    const base = environment.apiBaseUrl;
    const path = this.runId ? `${base}/runs/${this.runId}/diffs` : `${base}/diffs`;
    const qp: Record<string, any> = { page: this.filter.page, pageSize: this.filter.pageSize };
    if (this.filter.tradeId) qp['tradeId'] = this.filter.tradeId;
    if (this.filter.book)    qp['book']    = this.filter.book;
    if (this.filter.desk)    qp['desk']    = this.filter.desk;

    const qs = Object.entries(qp).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    this.apiQueryText   = JSON.stringify({ method: 'GET', url: `${path}?${qs}`, params: qp }, null, 2);
    this.apiQueryVisible = true;
  }

  copyApiQuery(): void {
    navigator.clipboard.writeText(this.apiQueryText).then(() => {
      this.copyFeedback = 'Copied!';
      setTimeout(() => (this.copyFeedback = ''), 2000);
    });
  }

  exportToCsv(): void {
    if (!this.activeGrid) return;
    const leafCols = (this.activeGrid.getVisibleColumns() as any[]).filter(c => !c.isBand && c.dataField);
    const activeCols = this.activeColDefs;
    const rows: string[][] = [];

    // Band header row
    rows.push(leafCols.map(c => {
      const band = activeCols.find(b => b.isBand && b.columns?.some((s: any) => s.dataField === c.dataField));
      return band ? `"${band.caption}"` : '""';
    }));
    // Sub-header row
    rows.push(leafCols.map(c => `"${c.caption ?? c.dataField ?? ''}"`));
    // Data rows
    for (const row of this.activeData) {
      rows.push(leafCols.map(c => {
        const v = row[c.dataField!];
        if (v == null)             return '';
        if (typeof v === 'string') return `"${v.replace(/"/g, '""')}"`;
        return String(v);
      }));
    }

    const csv  = rows.map(r => r.join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), {
      href:     url,
      download: `diff-results-run${this.runId ?? 'all'}-tab${this.activeTab}-${new Date().toISOString().slice(0, 10)}.csv`,
    }).click();
    URL.revokeObjectURL(url);
  }

  // ── Template helpers ──────────────────────────────────────────────────────────

  getNumFmt(dataField: string | undefined): string {
    const p = dataField ? (this.decimalMap.get(dataField) ?? 4) : 4;
    return `1.${p}-${p}`;
  }

  parseDiffs(raw: string | null): { field: string; ref: unknown; tgt: unknown }[] {
    if (!raw) return [];
    try {
      const obj = JSON.parse(raw) as Record<string, { Ref: unknown; Tgt: unknown }>;
      return Object.entries(obj).map(([field, v]) => ({ field, ref: v.Ref, tgt: v.Tgt }));
    } catch { return []; }
  }

  parseCompareItems(raw: string | null): { field: string; value: unknown }[] {
    if (!raw) return [];
    try {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      return Object.entries(obj).map(([field, value]) => {
        // Support nested { Ref, Tgt } structure — pick whichever side exists
        if (value && typeof value === 'object' && ('Ref' in value || 'Tgt' in value)) {
          const v = value as { Ref?: unknown; Tgt?: unknown };
          return { field, value: v.Ref ?? v.Tgt ?? null };
        }
        return { field, value };
      });
    } catch { return []; }
  }

  isNumeric(v: unknown): boolean { return typeof v === 'number'; }
  calcDelta(ref: unknown, tgt: unknown): number { return (tgt as number) - (ref as number); }
  safeKey(field: string): string { return field.replace(/[^a-zA-Z0-9_]/g, '_'); }

  private get activeData(): any[] {
    switch (this.activeTab) {
      case 1:  return this.flatRefOrphans;
      case 2:  return this.flatTgtOrphans;
      default: return this.flatDiffs;
    }
  }

  private get activeColDefs(): any[] {
    switch (this.activeTab) {
      case 1:  return this.orphanColsRef;
      case 2:  return this.orphanColsTgt;
      default: return this.columnDefs;
    }
  }

  private isNumericColumn(col: any): boolean {
    return col?.dataType === 'number'
      || (col?.dataField && /(_ref|_tgt|_diff|^ci_)/.test(col.dataField));
  }

  private formatCtxValue(v: any): string {
    if (v == null)             return '—';
    if (typeof v === 'number') return v.toLocaleString(undefined, { maximumFractionDigits: 6 });
    return `"${String(v)}"`;
  }

  private clearAllData(): void {
    this.diffs = []; this.flatDiffs = []; this.columnDefs = [];
    this.flatRefOrphans = []; this.orphanColsRef = [];
    this.flatTgtOrphans = []; this.orphanColsTgt = [];
    this.totalCount = 0;
    this.tabs = [
      { text: 'In Both (diff)',    badge: '' },
      { text: 'Only in Reference', badge: '' },
      { text: 'Only in Target',    badge: '' },
    ];
  }

  private resetFilters(): void {
    this.tradeIdInput = '';
    this.bookInput    = '';
    this.deskInput    = '';
    this.filter       = { page: 1, pageSize: 1000 };
  }
}
