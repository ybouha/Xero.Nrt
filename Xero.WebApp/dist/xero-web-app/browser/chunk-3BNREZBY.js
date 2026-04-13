import {
  ResultViewerService
} from "./chunk-BN2MEMSV.js";
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
} from "./chunk-QHX6XEZF.js";
import {
  ActivatedRoute,
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  Router,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
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
} from "./chunk-MKDRXMS5.js";

// src/app/pages/diff-results/diff-results.component.ts
function DiffResultsComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 19);
    \u0275\u0275element(2, "circle", 20)(3, "line", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Select an NRT run above to view its diff results");
    \u0275\u0275elementEnd()();
  }
}
function DiffResultsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "dx-load-indicator", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("visible", true);
  }
}
function DiffResultsComponent_div_21_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r3.value);
  }
}
function DiffResultsComponent_div_21_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r4.value);
  }
}
function DiffResultsComponent_div_21_div_16_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_21_div_16_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_21_div_16_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_21_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_div_21_div_16_span_1_Template, 2, 0, "span", 40)(2, DiffResultsComponent_div_21_div_16_span_2_Template, 2, 0, "span", 41)(3, DiffResultsComponent_div_21_div_16_span_3_Template, 2, 0, "span", 41);
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
function DiffResultsComponent_div_21_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 44);
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
function DiffResultsComponent_div_21_div_18_ng_container_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 53);
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
function DiffResultsComponent_div_21_div_18_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 47)(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 50);
    \u0275\u0275text(7, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 51);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DiffResultsComponent_div_21_div_18_ng_container_2_ng_container_10_Template, 4, 9, "ng-container", 52);
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
function DiffResultsComponent_div_21_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 45);
    \u0275\u0275template(2, DiffResultsComponent_div_21_div_18_ng_container_2_Template, 11, 4, "ng-container", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.parseDiffs(d_r8.data.diffs));
  }
}
function DiffResultsComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "dx-data-grid", 25);
    \u0275\u0275listener("onRowClick", function DiffResultsComponent_div_21_Template_dx_data_grid_onRowClick_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDetail($event.data));
    });
    \u0275\u0275element(2, "dxo-pager", 26)(3, "dxo-paging", 27)(4, "dxi-column", 28)(5, "dxi-column", 29)(6, "dxi-column", 30)(7, "dxi-column", 31)(8, "dxi-column", 32)(9, "dxi-column", 33)(10, "dxi-column", 34)(11, "dxi-column", 35)(12, "dxi-column", 36)(13, "dxi-column", 37);
    \u0275\u0275template(14, DiffResultsComponent_div_21_div_14_Template, 3, 1, "div", 38)(15, DiffResultsComponent_div_21_div_15_Template, 3, 1, "div", 38)(16, DiffResultsComponent_div_21_div_16_Template, 4, 3, "div", 38)(17, DiffResultsComponent_div_21_div_17_Template, 4, 4, "div", 38)(18, DiffResultsComponent_div_21_div_18_Template, 3, 1, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.diffs)("showBorders", false)("showColumnLines", false)("hoverStateEnabled", true)("columnAutoWidth", true);
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
function DiffResultsComponent_div_23_ng_container_1_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_23_ng_container_1_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_23_ng_container_1_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_23_ng_container_1_div_45_tr_15_ng_container_8_Template(rf, ctx) {
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
function DiffResultsComponent_div_23_ng_container_1_div_45_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 67);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 68);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 69);
    \u0275\u0275template(8, DiffResultsComponent_div_23_ng_container_1_div_45_tr_15_ng_container_8_Template, 3, 4, "ng-container", 52);
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
function DiffResultsComponent_div_23_ng_container_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64);
    \u0275\u0275text(2, "Field Differences");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 65)(4, "thead")(5, "tr")(6, "th");
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
    \u0275\u0275template(15, DiffResultsComponent_div_23_ng_container_1_div_45_tr_15_Template, 9, 4, "tr", 46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.parsedDiffs);
  }
}
function DiffResultsComponent_div_23_ng_container_1_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const diff_r10 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" This row is ", diff_r10.diffType === "OnlyInReference" ? "only in the reference" : "only in the target", " dataset. ");
  }
}
function DiffResultsComponent_div_23_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 55)(2, "div", 56)(3, "div", 57)(4, "span", 58);
    \u0275\u0275text(5, "Trade ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 59);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 57)(9, "span", 58);
    \u0275\u0275text(10, "Book");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 60);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 57)(14, "span", 58);
    \u0275\u0275text(15, "Desk");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 60);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 57)(19, "span", 58);
    \u0275\u0275text(20, "Risk Factor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 59);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 56)(24, "div", 57)(25, "span", 58);
    \u0275\u0275text(26, "Scenario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 60);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 57)(30, "span", 58);
    \u0275\u0275text(31, "Ref Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 60);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 57)(35, "span", 58);
    \u0275\u0275text(36, "Tgt Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 60);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 57)(40, "span", 58);
    \u0275\u0275text(41, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, DiffResultsComponent_div_23_ng_container_1_span_42_Template, 2, 0, "span", 40)(43, DiffResultsComponent_div_23_ng_container_1_span_43_Template, 2, 0, "span", 41)(44, DiffResultsComponent_div_23_ng_container_1_span_44_Template, 2, 0, "span", 41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(45, DiffResultsComponent_div_23_ng_container_1_div_45_Template, 16, 1, "div", 61)(46, DiffResultsComponent_div_23_ng_container_1_div_46_Template, 2, 1, "div", 62);
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
function DiffResultsComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275template(1, DiffResultsComponent_div_23_ng_container_1_Template, 47, 12, "ng-container", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedDiff);
  }
}
var DiffResultsComponent = class _DiffResultsComponent {
  constructor(viewer, route, router) {
    this.viewer = viewer;
    this.route = route;
    this.router = router;
    this.loading = true;
    this.runsLoading = true;
    this.diffs = [];
    this.runs = [];
    this.totalCount = 0;
    this.runId = null;
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
    this.viewer.getRuns(1, 200).subscribe({
      next: (result) => {
        this.runs = result.items.map((r) => __spreadProps(__spreadValues({}, r), {
          label: `#${r.runId} \u2014 ${r.scenarioName}  (${r.referenceVersion} \u2192 ${r.targetVersion})`
        }));
        this.runsLoading = false;
      },
      error: () => {
        this.runsLoading = false;
      }
    });
    this.route.queryParams.subscribe((params) => {
      const id = params["runId"];
      this.runId = id ? +id : null;
      this.resetFilters();
      if (this.runId) {
        this.loadDiffs();
      } else {
        this.diffs = [];
        this.totalCount = 0;
        this.loading = false;
      }
    });
  }
  onRunChange(runId) {
    this.router.navigate(["/diff-results"], {
      queryParams: runId ? { runId } : {},
      replaceUrl: true
    });
  }
  loadDiffs() {
    this.loading = true;
    const req = this.runId ? this.viewer.getDiffsForRun(this.runId, this.filter) : this.viewer.getDiffs(this.filter);
    req.subscribe({
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
    this.resetFilters();
    this.loadDiffs();
  }
  onDiffTypeChange(val) {
    this.filter = __spreadProps(__spreadValues({}, this.filter), { diffType: val ?? void 0, page: 1 });
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
  resetFilters() {
    this.tradeIdInput = "";
    this.bookInput = "";
    this.deskInput = "";
    this.filter = { page: 1, pageSize: 50 };
  }
  static {
    this.\u0275fac = function DiffResultsComponent_Factory(t) {
      return new (t || _DiffResultsComponent)(\u0275\u0275directiveInject(ResultViewerService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiffResultsComponent, selectors: [["app-diff-results"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 24, consts: [[1, "diff-results-page"], [1, "page-header"], [1, "subtitle"], [1, "count-badge"], [1, "filter-bar", "card"], ["displayExpr", "label", "valueExpr", "runId", "placeholder", "Select an NRT Run...", "width", "340", "stylingMode", "outlined", 3, "onValueChanged", "items", "value", "showClearButton", "disabled"], [1, "filter-divider"], ["displayExpr", "label", "valueExpr", "value", "placeholder", "Diff Type", "width", "170", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], ["placeholder", "Trade ID", "width", "130", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "Book", "width", "120", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "Desk", "width", "110", "stylingMode", "outlined", 3, "valueChange", "value"], ["text", "Apply", "type", "default", "stylingMode", "contained", 3, "onClick"], ["text", "Clear", "type", "normal", "stylingMode", "outlined", 3, "onClick"], ["class", "empty-state card", 4, "ngIf"], ["class", "loading-center", 4, "ngIf"], ["class", "card grid-wrap", 4, "ngIf"], [3, "visibleChange", "visible", "width", "height", "maxHeight", "showTitle", "title", "showCloseButton", "dragEnabled"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], [1, "empty-state", "card"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "opacity", ".35"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], [1, "loading-center"], ["height", "40", "width", "40", 3, "visible"], [1, "card", "grid-wrap"], ["keyExpr", "id", 3, "onRowClick", "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled", "columnAutoWidth"], [3, "showInfo", "showNavigationButtons"], [3, "pageSize"], ["dataField", "id", "caption", "#", "cellTemplate", "idTpl", 3, "width"], ["dataField", "tradeId", "caption", "Trade ID", "cellTemplate", "monoTpl", 3, "width"], ["dataField", "book", "caption", "Book", 3, "width"], ["dataField", "desk", "caption", "Desk", 3, "width"], ["dataField", "riskFactor", "caption", "Risk Factor", 3, "width"], ["dataField", "valuationDate", "caption", "Val Date", "cellTemplate", "monoTpl", 3, "width"], ["dataField", "diffType", "caption", "Type", "cellTemplate", "typeTpl", 3, "width"], ["dataField", "scenarioName", "caption", "Scenario", 3, "minWidth"], ["dataField", "runTimestamp", "caption", "Run At", "cellTemplate", "tsTpl", "sortOrder", "desc", 3, "width"], ["caption", "Diffs", "cellTemplate", "diffPreviewTpl", 3, "minWidth"], [4, "dxTemplate", "dxTemplateOf"], [1, "mono-sm"], ["class", "badge diff", 4, "ngIf"], ["class", "badge warn", 4, "ngIf"], [1, "badge", "diff"], [1, "badge", "warn"], [1, "ts"], [1, "diff-preview"], [4, "ngFor", "ngForOf"], [1, "diff-chip"], [1, "chip-field"], [1, "chip-ref"], [1, "chip-arrow"], [1, "chip-tgt"], [4, "ngIf"], [1, "chip-delta"], [1, "popup-content"], [1, "popup-meta"], [1, "meta-row"], [1, "meta-item"], [1, "meta-l"], [1, "meta-v", "mono-sm"], [1, "meta-v"], ["class", "diff-table-wrap", 4, "ngIf"], ["class", "no-diffs", 4, "ngIf"], [1, "diff-table-wrap"], [1, "section-title", 2, "margin-bottom", "10px"], [1, "diff-table"], [1, "field-name"], [1, "ref-val"], [1, "tgt-val"], [1, "delta"], [1, "no-diffs"]], template: function DiffResultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Diff Results");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "Browse comparison outcomes by NRT run");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "span", 3);
        \u0275\u0275text(8);
        \u0275\u0275pipe(9, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 4)(11, "dx-select-box", 5);
        \u0275\u0275listener("onValueChanged", function DiffResultsComponent_Template_dx_select_box_onValueChanged_11_listener($event) {
          let tmp_0_0;
          return ctx.onRunChange((tmp_0_0 = $event.value) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : null);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "div", 6);
        \u0275\u0275elementStart(13, "dx-select-box", 7);
        \u0275\u0275listener("onValueChanged", function DiffResultsComponent_Template_dx_select_box_onValueChanged_13_listener($event) {
          return ctx.onDiffTypeChange($event.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "dx-text-box", 8);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.tradeIdInput, $event) || (ctx.tradeIdInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "dx-text-box", 9);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.bookInput, $event) || (ctx.bookInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "dx-text-box", 10);
        \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_Template_dx_text_box_valueChange_16_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.deskInput, $event) || (ctx.deskInput = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "dx-button", 11);
        \u0275\u0275listener("onClick", function DiffResultsComponent_Template_dx_button_onClick_17_listener() {
          return ctx.applyFilters();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "dx-button", 12);
        \u0275\u0275listener("onClick", function DiffResultsComponent_Template_dx_button_onClick_18_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, DiffResultsComponent_div_19_Template, 6, 0, "div", 13)(20, DiffResultsComponent_div_20_Template, 2, 1, "div", 14)(21, DiffResultsComponent_div_21_Template, 19, 23, "div", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "dx-popup", 16);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_22_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event);
          return $event;
        });
        \u0275\u0275template(23, DiffResultsComponent_div_23_Template, 2, 1, "div", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_6_0;
        let tmp_18_0;
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(9, 22, ctx.totalCount), " total");
        \u0275\u0275advance(3);
        \u0275\u0275property("items", ctx.runs)("value", ctx.runId)("showClearButton", true)("disabled", ctx.runsLoading);
        \u0275\u0275advance(2);
        \u0275\u0275property("items", ctx.diffTypeOptions)("value", (tmp_6_0 = ctx.filter.diffType) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : null);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.tradeIdInput);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.bookInput);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("value", ctx.deskInput);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", !ctx.runId && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.runId && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.detailVisible);
        \u0275\u0275property("width", 680)("height", "auto")("maxHeight", "80vh")("showTitle", true)("title", ctx.selectedDiff ? "Diff #" + ctx.selectedDiff.id + " \u2014 " + ((tmp_18_0 = ctx.selectedDiff.tradeId) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : "") : "Diff Detail")("showCloseButton", true)("dragEnabled", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe, DatePipe, DxDataGridModule, DxDataGridComponent, DxiColumnComponent, DxoPagerComponent, DxoPagingComponent, DxTemplateDirective, DxSelectBoxModule, DxSelectBoxComponent, DxTextBoxModule, DxTextBoxComponent, DxButtonModule, DxButtonComponent, DxLoadIndicatorModule, DxLoadIndicatorComponent, DxPopupModule, DxPopupComponent], styles: ['\n\n.diff-results-page[_ngcontent-%COMP%] {\n  max-width: 1400px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-top: 4px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.filter-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 24px;\n  background: var(--card-border, rgba(255, 255, 255, 0.1));\n  flex-shrink: 0;\n}\n.count-badge[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  background: rgba(255, 255, 255, 0.06);\n  padding: 5px 12px;\n  border-radius: 20px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 14px 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n  font-size: 14px;\n  text-align: center;\n}\n.loading-center[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px 0;\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.ts[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.diff-preview[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 4px;\n  align-items: center;\n  overflow: visible;\n}\n.diff-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  background: rgba(79, 142, 247, 0.08);\n  border: 1px solid rgba(79, 142, 247, 0.18);\n  border-radius: 5px;\n  padding: 3px 8px;\n  font-size: 11px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  white-space: nowrap;\n}\n.chip-field[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-right: 2px;\n}\n.chip-ref[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.chip-arrow[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  opacity: 0.5;\n  font-size: 10px;\n}\n.chip-tgt[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.chip-delta[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  padding: 0 5px;\n  border-radius: 3px;\n  background: rgba(255, 255, 255, 0.06);\n  font-size: 10px;\n}\n.chip-delta.pos[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.chip-delta.neg[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.more-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  padding: 2px 4px;\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n}\n.popup-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.meta-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n.meta-l[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.meta-v[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.diff-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.diff-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--card-border);\n}\n.diff-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid var(--card-border);\n  font-size: 13px;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n}\n.field-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-family: monospace;\n}\n.ref-val[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n  font-family: monospace;\n}\n.tgt-val[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n  font-family: monospace;\n}\n.delta[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-family: monospace;\n  font-size: 12px;\n}\n.no-diffs[_ngcontent-%COMP%] {\n  padding: 20px;\n  text-align: center;\n  color: var(--text-secondary);\n  font-size: 13px;\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: 8px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n/*# sourceMappingURL=diff-results.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiffResultsComponent, { className: "DiffResultsComponent", filePath: "src\\app\\pages\\diff-results\\diff-results.component.ts", lineNumber: 26 });
})();
export {
  DiffResultsComponent
};
//# sourceMappingURL=chunk-3BNREZBY.js.map
