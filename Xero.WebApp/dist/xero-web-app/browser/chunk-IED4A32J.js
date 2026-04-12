import {
  ResultViewerService
} from "./chunk-AJMCEA7E.js";
import {
  DxButtonComponent,
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxPopupComponent,
  DxPopupModule,
  DxSelectBoxComponent,
  DxSelectBoxModule,
  DxTemplateDirective,
  DxTextBoxComponent,
  DxTextBoxModule,
  DxiColumnComponent,
  DxoPagerComponent,
  DxoPagingComponent
} from "./chunk-K34UMMAL.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  __spreadProps,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QNHS4Y2U.js";

// src/app/pages/diff-results/diff-results.component.ts
function DiffResultsComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "dx-load-indicator", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("visible", true);
  }
}
function DiffResultsComponent_div_18_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r3.value);
  }
}
function DiffResultsComponent_div_18_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r4.value);
  }
}
function DiffResultsComponent_div_18_div_16_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_18_div_16_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_18_div_16_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_18_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_div_18_div_16_span_1_Template, 2, 0, "span", 33)(2, DiffResultsComponent_div_18_div_16_span_2_Template, 2, 0, "span", 34)(3, DiffResultsComponent_div_18_div_16_span_3_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r5.value === "InBothButDiff");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r5.value === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r5.value === "OnlyInTarget");
  }
}
function DiffResultsComponent_div_18_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r6.value, "MMM d, HH:mm"));
  }
}
function DiffResultsComponent_div_18_div_18_ng_container_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("pos", ctx_r1.calcDelta(df_r7.ref, df_r7.tgt) > 0)("neg", ctx_r1.calcDelta(df_r7.ref, df_r7.tgt) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.calcDelta(df_r7.ref, df_r7.tgt) > 0 ? "+" : "", "", \u0275\u0275pipeBind2(3, 6, ctx_r1.calcDelta(df_r7.ref, df_r7.tgt), "1.2-2"), " ");
  }
}
function DiffResultsComponent_div_18_div_18_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 41)(2, "span", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 44);
    \u0275\u0275text(7, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 45);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DiffResultsComponent_div_18_div_18_ng_container_2_ng_container_10_Template, 4, 9, "ng-container", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(df_r7.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r7.ref);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(df_r7.tgt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isNumeric(df_r7.ref) && ctx_r1.isNumeric(df_r7.tgt));
  }
}
function DiffResultsComponent_div_18_div_18_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", ctx_r1.parseDiffs(d_r8.data.diffs).length - 3, " more ");
  }
}
function DiffResultsComponent_div_18_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 38);
    \u0275\u0275template(2, DiffResultsComponent_div_18_div_18_ng_container_2_Template, 11, 4, "ng-container", 39)(3, DiffResultsComponent_div_18_div_18_span_3_Template, 2, 1, "span", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.parseDiffs(d_r8.data.diffs).slice(0, 3));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parseDiffs(d_r8.data.diffs).length > 3);
  }
}
function DiffResultsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "dx-data-grid", 18);
    \u0275\u0275listener("onRowClick", function DiffResultsComponent_div_18_Template_dx_data_grid_onRowClick_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDetail($event.data));
    });
    \u0275\u0275element(2, "dxo-pager", 19)(3, "dxo-paging", 20)(4, "dxi-column", 21)(5, "dxi-column", 22)(6, "dxi-column", 23)(7, "dxi-column", 24)(8, "dxi-column", 25)(9, "dxi-column", 26)(10, "dxi-column", 27)(11, "dxi-column", 28)(12, "dxi-column", 29)(13, "dxi-column", 30);
    \u0275\u0275template(14, DiffResultsComponent_div_18_div_14_Template, 3, 1, "div", 31)(15, DiffResultsComponent_div_18_div_15_Template, 3, 1, "div", 31)(16, DiffResultsComponent_div_18_div_16_Template, 4, 3, "div", 31)(17, DiffResultsComponent_div_18_div_17_Template, 4, 4, "div", 31)(18, DiffResultsComponent_div_18_div_18_Template, 4, 2, "div", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.diffs)("showBorders", false)("showColumnLines", false)("hoverStateEnabled", true);
    \u0275\u0275advance();
    \u0275\u0275property("showInfo", true)("showNavigationButtons", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 50);
    \u0275\u0275advance();
    \u0275\u0275property("width", 70);
    \u0275\u0275advance();
    \u0275\u0275property("width", 120);
    \u0275\u0275advance();
    \u0275\u0275property("width", 110);
    \u0275\u0275advance();
    \u0275\u0275property("width", 100);
    \u0275\u0275advance();
    \u0275\u0275property("width", 130);
    \u0275\u0275advance();
    \u0275\u0275property("width", 100);
    \u0275\u0275advance();
    \u0275\u0275property("width", 140);
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 120);
    \u0275\u0275advance();
    \u0275\u0275property("width", 140);
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 200);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "idTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "monoTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "typeTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffPreviewTpl");
  }
}
function DiffResultsComponent_div_20_ng_container_1_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_20_ng_container_1_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_20_ng_container_1_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_20_ng_container_1_div_45_tr_15_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r1.calcDelta(df_r9.ref, df_r9.tgt), "1.4-4"), " ");
  }
}
function DiffResultsComponent_div_20_ng_container_1_div_45_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 62);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 63);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 64);
    \u0275\u0275template(8, DiffResultsComponent_div_20_ng_container_1_div_45_tr_15_ng_container_8_Template, 3, 4, "ng-container", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const df_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r9.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r9.ref);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r9.tgt);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isNumeric(df_r9.ref) && ctx_r1.isNumeric(df_r9.tgt));
  }
}
function DiffResultsComponent_div_20_ng_container_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 59);
    \u0275\u0275text(2, "Field Differences");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 60)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Field");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "\u0394");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, DiffResultsComponent_div_20_ng_container_1_div_45_tr_15_Template, 9, 4, "tr", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.parsedDiffs);
  }
}
function DiffResultsComponent_div_20_ng_container_1_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const diff_r10 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" This row is ", diff_r10.diffType === "OnlyInReference" ? "only in the reference" : "only in the target", " dataset. ");
  }
}
function DiffResultsComponent_div_20_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 50)(2, "div", 51)(3, "div", 52)(4, "span", 53);
    \u0275\u0275text(5, "Trade ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 54);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 52)(9, "span", 53);
    \u0275\u0275text(10, "Book");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 55);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 52)(14, "span", 53);
    \u0275\u0275text(15, "Desk");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 55);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 52)(19, "span", 53);
    \u0275\u0275text(20, "Risk Factor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 54);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 51)(24, "div", 52)(25, "span", 53);
    \u0275\u0275text(26, "Scenario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 55);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 52)(30, "span", 53);
    \u0275\u0275text(31, "Ref Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 55);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 52)(35, "span", 53);
    \u0275\u0275text(36, "Tgt Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 55);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 52)(40, "span", 53);
    \u0275\u0275text(41, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, DiffResultsComponent_div_20_ng_container_1_span_42_Template, 2, 0, "span", 33)(43, DiffResultsComponent_div_20_ng_container_1_span_43_Template, 2, 0, "span", 34)(44, DiffResultsComponent_div_20_ng_container_1_span_44_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(45, DiffResultsComponent_div_20_ng_container_1_div_45_Template, 16, 1, "div", 56)(46, DiffResultsComponent_div_20_ng_container_1_div_46_Template, 2, 1, "div", 57);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const diff_r10 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(diff_r10.tradeId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r10.book);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r10.desk);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r10.riskFactor);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(diff_r10.scenarioName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r10.referenceVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r10.targetVersion);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", diff_r10.diffType === "InBothButDiff");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", diff_r10.diffType === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", diff_r10.diffType === "OnlyInTarget");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parsedDiffs.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.parsedDiffs.length === 0 && diff_r10.diffType !== "InBothButDiff");
  }
}
function DiffResultsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, DiffResultsComponent_div_20_ng_container_1_Template, 47, 12, "ng-container", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedDiff);
  }
}
var DiffResultsComponent = class _DiffResultsComponent {
  constructor(viewer) {
    this.viewer = viewer;
    this.loading = true;
    this.diffs = [];
    this.totalCount = 0;
    this.filter = { page: 1, pageSize: 50 };
    this.tradeIdInput = "";
    this.bookInput = "";
    this.deskInput = "";
    this.diffTypeOptions = [
      { value: null, label: "All Types" },
      { value: "InBothButDiff", label: "In Both (diff)" },
      { value: "OnlyInReference", label: "Only in Ref" },
      { value: "OnlyInTarget", label: "Only in Target" }
    ];
    this.detailVisible = false;
    this.selectedDiff = null;
    this.parsedDiffs = [];
  }
  ngOnInit() {
    this.loadDiffs();
  }
  loadDiffs() {
    this.loading = true;
    this.viewer.getDiffs(this.filter).subscribe({
      next: (result) => {
        this.diffs = result.items;
        this.totalCount = result.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  applyFilters() {
    this.filter = __spreadProps(__spreadValues({}, this.filter), {
      page: 1,
      tradeId: this.tradeIdInput || void 0,
      book: this.bookInput || void 0,
      desk: this.deskInput || void 0
    });
    this.loadDiffs();
  }
  clearFilters() {
    this.tradeIdInput = "";
    this.bookInput = "";
    this.deskInput = "";
    this.filter = { page: 1, pageSize: 50 };
    this.loadDiffs();
  }
  onDiffTypeChange(val) {
    this.filter = __spreadProps(__spreadValues({}, this.filter), { diffType: val ?? void 0, page: 1 });
    this.loadDiffs();
  }
  onPageChange(e) {
    this.filter = __spreadProps(__spreadValues({}, this.filter), { page: e.pageIndex + 1, pageSize: e.pageSize });
    this.loadDiffs();
  }
  openDetail(diff) {
    this.selectedDiff = diff;
    this.parsedDiffs = this.parseDiffs(diff.diffs);
    this.detailVisible = true;
  }
  parseDiffs(raw) {
    if (!raw)
      return [];
    try {
      const obj = JSON.parse(raw);
      return Object.entries(obj).map(([field, v]) => ({ field, ref: v.Ref, tgt: v.Tgt }));
    } catch {
      return [];
    }
  }
  isNumeric(v) {
    return typeof v === "number";
  }
  calcDelta(ref, tgt) {
    return tgt - ref;
  }
  static {
    this.\u0275fac = function DiffResultsComponent_Factory(t) {
      return new (t || _DiffResultsComponent)(\u0275\u0275directiveInject(ResultViewerService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiffResultsComponent, selectors: [["app-diff-results"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 19, consts: [[1, "diff-results-page"], [1, "page-header"], [1, "subtitle"], [1, "count-badge"], [1, "filter-bar", "card"], ["displayExpr", "label", "valueExpr", "value", "placeholder", "Diff Type", "width", "170", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], ["placeholder", "Trade ID", "width", "130", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "Book", "width", "120", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "Desk", "width", "110", "stylingMode", "outlined", 3, "valueChange", "value"], ["text", "Apply", "type", "default", "stylingMode", "contained", 3, "onClick"], ["text", "Clear", "type", "normal", "stylingMode", "outlined", 3, "onClick"], ["class", "loading-center", 4, "ngIf"], ["class", "card grid-wrap", 4, "ngIf"], [3, "visibleChange", "visible", "width", "height", "maxHeight", "showTitle", "title", "showCloseButton", "dragEnabled"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], [1, "loading-center"], ["height", "40", "width", "40", 3, "visible"], [1, "card", "grid-wrap"], ["keyExpr", "id", 3, "onRowClick", "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled"], [3, "showInfo", "showNavigationButtons"], [3, "pageSize"], ["dataField", "id", "caption", "#", "cellTemplate", "idTpl", 3, "width"], ["dataField", "tradeId", "caption", "Trade ID", "cellTemplate", "monoTpl", 3, "width"], ["dataField", "book", "caption", "Book", 3, "width"], ["dataField", "desk", "caption", "Desk", 3, "width"], ["dataField", "riskFactor", "caption", "Risk Factor", 3, "width"], ["dataField", "valuationDate", "caption", "Val Date", "cellTemplate", "monoTpl", 3, "width"], ["dataField", "diffType", "caption", "Type", "cellTemplate", "typeTpl", 3, "width"], ["dataField", "scenarioName", "caption", "Scenario", 3, "minWidth"], ["dataField", "runTimestamp", "caption", "Run At", "cellTemplate", "tsTpl", "sortOrder", "desc", 3, "width"], ["caption", "Diffs", "cellTemplate", "diffPreviewTpl", 3, "minWidth"], [4, "dxTemplate", "dxTemplateOf"], [1, "mono-sm"], ["class", "badge diff", 4, "ngIf"], ["class", "badge warn", 4, "ngIf"], [1, "badge", "diff"], [1, "badge", "warn"], [1, "ts"], [1, "diff-preview"], [4, "ngFor", "ngForOf"], ["class", "more-chip", 4, "ngIf"], [1, "diff-chip"], [1, "chip-field"], [1, "chip-ref"], [1, "chip-arrow"], [1, "chip-tgt"], [4, "ngIf"], [1, "chip-delta"], [1, "more-chip"], [1, "popup-content"], [1, "popup-meta"], [1, "meta-row"], [1, "meta-item"], [1, "meta-l"], [1, "meta-v", "mono-sm"], [1, "meta-v"], ["class", "diff-table-wrap", 4, "ngIf"], ["class", "no-diffs", 4, "ngIf"], [1, "diff-table-wrap"], [1, "section-title", 2, "margin-bottom", "10px"], [1, "diff-table"], [1, "field-name"], [1, "ref-val"], [1, "tgt-val"], [1, "delta"], [1, "no-diffs"]], template: function DiffResultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Diff Results");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "Browse comparison outcomes across all runs");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "span", 3);
        \u0275\u0275text(8);
        \u0275\u0275pipe(9, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 4)(11, "dx-select-box", 5);
        \u0275\u0275listener("onValueChanged", function DiffResultsComponent_Template_dx_select_box_onValueChanged_11_listener($event) {
          return ctx.onDiffTypeChange($event.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "dx-text-box", 6);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.tradeIdInput, $event) || (ctx.tradeIdInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "dx-text-box", 7);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.bookInput, $event) || (ctx.bookInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "dx-text-box", 8);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.deskInput, $event) || (ctx.deskInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "dx-button", 9);
        \u0275\u0275listener("onClick", function DiffResultsComponent_Template_dx_button_onClick_15_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "dx-button", 10);
        \u0275\u0275listener("onClick", function DiffResultsComponent_Template_dx_button_onClick_16_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(17, DiffResultsComponent_div_17_Template, 2, 1, "div", 11)(18, DiffResultsComponent_div_18_Template, 19, 22, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "dx-popup", 13);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event);
          return $event;
        });
        \u0275\u0275template(20, DiffResultsComponent_div_20_Template, 2, 1, "div", 14);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_13_0;
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(9, 17, ctx.totalCount), " total");
        \u0275\u0275advance(3);
        \u0275\u0275property("items", ctx.diffTypeOptions)("value", (tmp_2_0 = ctx.filter.diffType) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : null);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.tradeIdInput);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.bookInput);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.deskInput);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.detailVisible);
        \u0275\u0275property("width", 680)("height", "auto")("maxHeight", "80vh")("showTitle", true)("title", ctx.selectedDiff ? "Diff #" + ctx.selectedDiff.id + " \u2014 " + ((tmp_13_0 = ctx.selectedDiff.tradeId) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "") : "Diff Detail")("showCloseButton", true)("dragEnabled", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, DatePipe, DxDataGridModule, DxDataGridComponent, DxiColumnComponent, DxoPagerComponent, DxoPagingComponent, DxTemplateDirective, DxSelectBoxModule, DxSelectBoxComponent, DxTextBoxModule, DxTextBoxComponent, DxButtonModule, DxButtonComponent, DxLoadIndicatorModule, DxLoadIndicatorComponent, DxPopupModule, DxPopupComponent], styles: ['\n\n.diff-results-page[_ngcontent-%COMP%] {\n  max-width: 1400px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-top: 4px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.count-badge[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  background: rgba(255, 255, 255, 0.06);\n  padding: 5px 12px;\n  border-radius: 20px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 14px 16px;\n}\n.loading-center[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px 0;\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.ts[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.diff-preview[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  align-items: center;\n}\n.diff-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  background: rgba(79, 142, 247, 0.08);\n  border: 1px solid rgba(79, 142, 247, 0.18);\n  border-radius: 5px;\n  padding: 3px 8px;\n  font-size: 11px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  white-space: nowrap;\n}\n.chip-field[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-right: 2px;\n}\n.chip-ref[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.chip-arrow[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  opacity: 0.5;\n  font-size: 10px;\n}\n.chip-tgt[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.chip-delta[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  padding: 0 5px;\n  border-radius: 3px;\n  background: rgba(255, 255, 255, 0.06);\n  font-size: 10px;\n}\n.chip-delta.pos[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.chip-delta.neg[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.more-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  padding: 2px 4px;\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n}\n.popup-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.meta-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n.meta-l[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.meta-v[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.diff-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.diff-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--card-border);\n}\n.diff-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid var(--card-border);\n  font-size: 13px;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n}\n.field-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-family: monospace;\n}\n.ref-val[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n  font-family: monospace;\n}\n.tgt-val[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n  font-family: monospace;\n}\n.delta[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-family: monospace;\n  font-size: 12px;\n}\n.no-diffs[_ngcontent-%COMP%] {\n  padding: 20px;\n  text-align: center;\n  color: var(--text-secondary);\n  font-size: 13px;\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: 8px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n/*# sourceMappingURL=diff-results.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiffResultsComponent, { className: "DiffResultsComponent", filePath: "src\\app\\pages\\diff-results\\diff-results.component.ts", lineNumber: 25 });
})();
export {
  DiffResultsComponent
};
//# sourceMappingURL=chunk-IED4A32J.js.map
