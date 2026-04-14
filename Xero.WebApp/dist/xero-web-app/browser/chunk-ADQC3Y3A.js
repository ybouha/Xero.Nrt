import {
  ResultViewerService
} from "./chunk-UQDPMOCQ.js";
import {
  DxChartComponent,
  DxChartModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxPieChartComponent,
  DxPieChartModule,
  DxiSeriesComponent,
  DxoArgumentAxisComponent,
  DxoCommonSeriesSettingsComponent,
  DxoLabelComponent,
  DxoLegendComponent,
  DxoTooltipComponent
} from "./chunk-VGKFB52G.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  RouterLink,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WGIWJJBP.js";

// src/app/pages/dashboard/dashboard.component.ts
var _c0 = () => ["#3ecf8e", "#f66d6d"];
function DashboardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "dx-load-indicator", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading dashboard\u2026");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("visible", true);
  }
}
function DashboardComponent_ng_container_14_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275element(1, "span", 39);
    \u0275\u0275text(2, "PASS");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275element(1, "span", 39);
    \u0275\u0275text(2, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_tr_74_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275element(1, "span", 39);
    \u0275\u0275text(2, "PASS");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_tr_74_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275element(1, "span", 39);
    \u0275\u0275text(2, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_tr_74_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Running");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_14_tr_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 42);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 43)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 44);
    \u0275\u0275element(9, "path", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 42);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275template(15, DashboardComponent_ng_container_14_tr_74_span_15_Template, 3, 0, "span", 17)(16, DashboardComponent_ng_container_14_tr_74_span_16_Template, 3, 0, "span", 18)(17, DashboardComponent_ng_container_14_tr_74_span_17_Template, 2, 0, "span", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 46);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 47);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const run_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(run_r1.runId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(run_r1.scenarioName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(run_r1.referenceVersion);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(run_r1.targetVersion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(run_r1.valuationDate);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", run_r1.passed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r1.passed === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r1.passed === null);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-diff", ((tmp_11_0 = run_r1.diffRowCount) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_12_0 = run_r1.diffRowCount) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 12, run_r1.runTimestamp, "MMM d, HH:mm"));
  }
}
function DashboardComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4, "Total Runs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16);
    \u0275\u0275text(8, "All time");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 13)(10, "div", 14);
    \u0275\u0275text(11, "Pass Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 16);
    \u0275\u0275text(15, "Completed runs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 13)(17, "div", 14);
    \u0275\u0275text(18, "Total Diffs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 15);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 16);
    \u0275\u0275text(23, "Across all runs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 13)(25, "div", 14);
    \u0275\u0275text(26, "Last Run");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 15);
    \u0275\u0275template(28, DashboardComponent_ng_container_14_span_28_Template, 3, 0, "span", 17)(29, DashboardComponent_ng_container_14_span_29_Template, 3, 0, "span", 18)(30, DashboardComponent_ng_container_14_span_30_Template, 2, 0, "span", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 16);
    \u0275\u0275text(32, "Most recent");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 20)(34, "div", 21)(35, "div", 22);
    \u0275\u0275text(36, "Runs Per Day");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "dx-chart", 23);
    \u0275\u0275element(38, "dxi-series", 24)(39, "dxi-series", 25);
    \u0275\u0275elementStart(40, "dxo-argument-axis");
    \u0275\u0275element(41, "dxo-label", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "dxo-legend", 27)(43, "dxo-common-series-settings", 28)(44, "dxo-tooltip", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 30)(46, "div", 22);
    \u0275\u0275text(47, "Run Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "dx-pie-chart", 31)(49, "dxi-series", 32);
    \u0275\u0275element(50, "dxo-label", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "dxo-legend", 27)(52, "dxo-tooltip", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 34)(54, "div", 22);
    \u0275\u0275text(55, "Recent Runs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "table", 35)(57, "thead")(58, "tr")(59, "th");
    \u0275\u0275text(60, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "th");
    \u0275\u0275text(62, "Scenario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "th");
    \u0275\u0275text(64, "Ref \u2192 Target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "th");
    \u0275\u0275text(66, "Val Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "th");
    \u0275\u0275text(68, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "th");
    \u0275\u0275text(70, "Diffs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "th");
    \u0275\u0275text(72, "Timestamp");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "tbody");
    \u0275\u0275template(74, DashboardComponent_ng_container_14_tr_74_Template, 23, 15, "tr", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "a", 37);
    \u0275\u0275text(76, "View all runs \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats.totalRuns);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("trend-up", ctx_r1.stats.passRate >= 80)("trend-down", ctx_r1.stats.passRate < 80);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.stats.passRate, "% ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 20, ctx_r1.stats.totalDiffs));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.stats.lastRunPassed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats.lastRunPassed === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats.lastRunPassed === null);
    \u0275\u0275advance(7);
    \u0275\u0275property("dataSource", ctx_r1.runsPerDayData)("palette", \u0275\u0275pureFunction0(22, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275property("customizeText", ctx_r1.formatDay);
    \u0275\u0275advance(3);
    \u0275\u0275property("enabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("dataSource", ctx_r1.passFailData)("customizePoint", ctx_r1.passFailColor);
    \u0275\u0275advance(2);
    \u0275\u0275property("visible", true)("customizeText", ctx_r1.formatPieLabel);
    \u0275\u0275advance(2);
    \u0275\u0275property("enabled", true);
    \u0275\u0275advance(22);
    \u0275\u0275property("ngForOf", ctx_r1.recentRuns);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(viewer) {
    this.viewer = viewer;
    this.loading = true;
    this.runs = [];
    this.recentRuns = [];
    this.stats = { totalRuns: 0, passRate: 0, totalDiffs: 0, lastRunPassed: null };
    this.passFailData = [];
    this.runsPerDayData = [];
    this.passFailColor = (arg) => {
      const map = { Pass: "#3ecf8e", Fail: "#f66d6d", Running: "#f5a623" };
      return { color: map[arg.argument] ?? "#4f8ef7" };
    };
    this.formatDay = (arg) => arg.valueText.slice(5);
    this.formatPieLabel = (arg) => `${arg.argument}: ${arg.percentText}`;
  }
  ngOnInit() {
    this.viewer.getRuns(1, 100).subscribe({
      next: (result) => {
        this.runs = result.items;
        this.recentRuns = result.items.slice(0, 6);
        this.buildStats();
        this.buildCharts();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  buildStats() {
    const completed = this.runs.filter((r) => r.passed !== null);
    const passed = completed.filter((r) => r.passed === true).length;
    this.stats = {
      totalRuns: this.runs.length,
      passRate: completed.length ? Math.round(passed / completed.length * 100) : 0,
      totalDiffs: this.runs.reduce((s, r) => s + (r.diffRowCount ?? 0), 0),
      lastRunPassed: this.runs[0]?.passed ?? null
    };
  }
  buildCharts() {
    const passed = this.runs.filter((r) => r.passed === true).length;
    const failed = this.runs.filter((r) => r.passed === false).length;
    const pending = this.runs.filter((r) => r.passed === null).length;
    this.passFailData = [
      { status: "Pass", count: passed },
      { status: "Fail", count: failed },
      { status: "Running", count: pending }
    ].filter((d) => d.count > 0);
    const buckets = /* @__PURE__ */ new Map();
    for (const run of this.runs) {
      const day = run.runTimestamp.substring(0, 10);
      const b = buckets.get(day) ?? { runs: 0, passed: 0, failed: 0 };
      b.runs++;
      if (run.passed === true)
        b.passed++;
      if (run.passed === false)
        b.failed++;
      buckets.set(day, b);
    }
    this.runsPerDayData = [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-14).map(([date, v]) => __spreadValues({ date }, v));
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(ResultViewerService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 2, consts: [[1, "dashboard"], [1, "page-header"], [1, "subtitle"], [1, "actions"], ["routerLink", "/new-run", 1, "btn-primary"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["class", "loading-center", 4, "ngIf"], [4, "ngIf"], [1, "loading-center"], ["height", "40", "width", "40", 3, "visible"], [1, "stat-grid"], [1, "stat-card"], [1, "label"], [1, "value"], [1, "sub"], ["class", "badge pass", 4, "ngIf"], ["class", "badge fail", 4, "ngIf"], ["class", "badge warn", 4, "ngIf"], [1, "charts-row"], [1, "card", "chart-card"], [1, "section-title"], [3, "dataSource", "palette"], ["argumentField", "date", "valueField", "passed", "name", "Passed", "type", "bar", "color", "#3ecf8e"], ["argumentField", "date", "valueField", "failed", "name", "Failed", "type", "bar", "color", "#f66d6d"], [3, "customizeText"], ["verticalAlignment", "bottom", "horizontalAlignment", "center"], ["argumentField", "date", "type", "bar"], [3, "enabled"], [1, "card", "chart-card", "chart-card--sm"], [3, "dataSource", "customizePoint"], ["argumentField", "status", "valueField", "count"], [3, "visible", "customizeText"], [1, "card", "recent-card"], [1, "run-table"], [4, "ngFor", "ngForOf"], ["routerLink", "/nrt-runs", 1, "view-all"], [1, "badge", "pass"], [1, "dot"], [1, "badge", "fail"], [1, "badge", "warn"], [1, "mono"], [1, "versions"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M5 12h14M12 5l7 7-7 7"], [1, "mono", "diff-count"], [1, "ts"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "NRT comparison overview");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3)(8, "a", 4);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 5);
        \u0275\u0275element(10, "line", 6)(11, "line", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " New Run ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(13, DashboardComponent_div_13_Template, 4, 1, "div", 8)(14, DashboardComponent_ng_container_14_Template, 77, 23, "ng-container", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, DatePipe, RouterLink, DxChartModule, DxChartComponent, DxoArgumentAxisComponent, DxoLabelComponent, DxoCommonSeriesSettingsComponent, DxoLegendComponent, DxiSeriesComponent, DxoTooltipComponent, DxPieChartModule, DxPieChartComponent, DxLoadIndicatorModule, DxLoadIndicatorComponent], styles: ['\n\n.dashboard[_ngcontent-%COMP%] {\n  max-width: 1400px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-top: 4px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--accent);\n  color: #fff;\n  text-decoration: none;\n  padding: 9px 16px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  transition: opacity 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.loading-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 320px;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.chart-card[_ngcontent-%COMP%] {\n  min-height: 280px;\n}\n.chart-card[_ngcontent-%COMP%]   dx-chart[_ngcontent-%COMP%], .chart-card[_ngcontent-%COMP%]   dx-pie-chart[_ngcontent-%COMP%] {\n  height: 230px;\n}\n.recent-card[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.run-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 16px;\n}\n.run-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 0 12px 10px;\n  border-bottom: 1px solid var(--card-border);\n}\n.run-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid var(--card-border);\n  color: var(--text-primary);\n  font-size: 13px;\n}\n.run-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.run-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.run-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n}\n.mono[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.versions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.versions[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  flex-shrink: 0;\n}\n.diff-count[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.diff-count.has-diff[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n  font-weight: 600;\n}\n.ts[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.view-all[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--accent);\n  text-decoration: none;\n  font-weight: 500;\n}\n.view-all[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\pages\\dashboard\\dashboard.component.ts", lineNumber: 22 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-ADQC3Y3A.js.map
