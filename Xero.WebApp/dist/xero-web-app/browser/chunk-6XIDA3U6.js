import {
  ResultViewerService
} from "./chunk-AJMCEA7E.js";
import {
  RouterLink
} from "./chunk-K64HRWYL.js";
import {
  DxButtonModule,
  DxCircularGaugeComponent,
  DxCircularGaugeModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxPopupComponent,
  DxPopupModule,
  DxSelectBoxComponent,
  DxSelectBoxModule,
  DxTabsModule,
  DxTemplateDirective,
  DxiColumnComponent,
  DxiRangeComponent,
  DxoGeometryComponent,
  DxoLabelComponent,
  DxoPagerComponent,
  DxoPagingComponent,
  DxoRangeContainerComponent,
  DxoScaleComponent,
  DxoScrollingComponent,
  DxoSelectionComponent,
  DxoValueIndicatorComponent
} from "./chunk-K34UMMAL.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QNHS4Y2U.js";

// src/app/pages/nrt-runs/nrt-runs.component.ts
function NrtRunsComponent_dx_load_indicator_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 46);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("visible", ctx_r0.loading);
  }
}
function NrtRunsComponent_div_25_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", d_r3.value, "");
  }
}
function NrtRunsComponent_div_25_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 62)(2, "span", 63);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 64);
    \u0275\u0275element(5, "path", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 66);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r4.data.referenceVersion);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(d_r4.data.targetVersion);
  }
}
function NrtRunsComponent_div_25_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.value);
  }
}
function NrtRunsComponent_div_25_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275element(1, "span", 72);
    \u0275\u0275text(2, "Pass");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_25_div_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275element(1, "span", 72);
    \u0275\u0275text(2, "Fail");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_25_div_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, "Running");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_25_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, NrtRunsComponent_div_25_div_13_span_1_Template, 3, 0, "span", 68)(2, NrtRunsComponent_div_25_div_13_span_2_Template, 3, 0, "span", 69)(3, NrtRunsComponent_div_25_div_13_span_3_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === null);
  }
}
function NrtRunsComponent_div_25_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, d_r7.value));
  }
}
function NrtRunsComponent_div_25_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 75);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const d_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("has-diff", ((tmp_3_0 = d_r8.value) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, (tmp_4_0 = d_r8.value) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : 0));
  }
}
function NrtRunsComponent_div_25_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 76);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r9.value, "MMM d, HH:mm"));
  }
}
function NrtRunsComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "dx-data-grid", 48);
    \u0275\u0275listener("onRowClick", function NrtRunsComponent_div_25_Template_dx_data_grid_onRowClick_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRowClick($event));
    });
    \u0275\u0275element(2, "dxo-selection", 49)(3, "dxo-paging", 50)(4, "dxo-scrolling", 51)(5, "dxi-column", 52);
    \u0275\u0275template(6, NrtRunsComponent_div_25_div_6_Template, 3, 1, "div", 53);
    \u0275\u0275element(7, "dxi-column", 54)(8, "dxi-column", 55);
    \u0275\u0275template(9, NrtRunsComponent_div_25_div_9_Template, 8, 2, "div", 53);
    \u0275\u0275element(10, "dxi-column", 56);
    \u0275\u0275template(11, NrtRunsComponent_div_25_div_11_Template, 3, 1, "div", 53);
    \u0275\u0275element(12, "dxi-column", 57);
    \u0275\u0275template(13, NrtRunsComponent_div_25_div_13_Template, 4, 3, "div", 53);
    \u0275\u0275element(14, "dxi-column", 58);
    \u0275\u0275template(15, NrtRunsComponent_div_25_div_15_Template, 4, 3, "div", 53);
    \u0275\u0275element(16, "dxi-column", 59);
    \u0275\u0275template(17, NrtRunsComponent_div_25_div_17_Template, 4, 5, "div", 53);
    \u0275\u0275element(18, "dxi-column", 60);
    \u0275\u0275template(19, NrtRunsComponent_div_25_div_19_Template, 4, 4, "div", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r0.runs)("showBorders", false)("showColumnLines", false)("rowAlternationEnabled", false)("hoverStateEnabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("enabled", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("width", 65)("allowSorting", true);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "idTpl");
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 120);
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 200);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "versionTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 100);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "dateTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 90);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "statusTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 100);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "rowsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 80);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 140);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
  }
}
function NrtRunsComponent_div_91_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1, "PASS");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_91_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77)(1, "div", 78);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NrtRunsComponent_div_91_span_3_Template, 2, 0, "span", 79)(4, NrtRunsComponent_div_91_span_4_Template, 2, 0, "span", 80);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const run_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(run_r10.scenarioName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r10.passed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r10.passed === false);
  }
}
function NrtRunsComponent_div_93_div_1_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275element(1, "span", 72);
    \u0275\u0275text(2, "PASS");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_93_div_1_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275element(1, "span", 72);
    \u0275\u0275text(2, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_93_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "div", 90)(2, "div", 91)(3, "span", 92);
    \u0275\u0275text(4, "Reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 93);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 91)(8, "span", 92);
    \u0275\u0275text(9, "Target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 93);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 91)(13, "span", 92);
    \u0275\u0275text(14, "Val Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 94);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 91)(18, "span", 92);
    \u0275\u0275text(19, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, NrtRunsComponent_div_93_div_1_span_20_Template, 3, 0, "span", 68)(21, NrtRunsComponent_div_93_div_1_span_21_Template, 3, 0, "span", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 91)(23, "span", 92);
    \u0275\u0275text(24, "Ref Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 93);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 91)(29, "span", 92);
    \u0275\u0275text(30, "Tgt Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 93);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 91)(35, "span", 92);
    \u0275\u0275text(36, "Diffs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 93);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 91)(41, "span", 92);
    \u0275\u0275text(42, "Only in Ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 95);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "number");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.referenceVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.targetVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.valuationDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.passed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.passed === false);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 11, ctx_r0.selectedRun.refRowCount));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 13, ctx_r0.selectedRun.tgtRowCount));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("fail-text", ((tmp_10_0 = ctx_r0.selectedRun.diffRowCount) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(39, 15, ctx_r0.selectedRun.diffRowCount), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 17, ctx_r0.selectedRun.onlyInRefCount));
  }
}
function NrtRunsComponent_div_93_dx_load_indicator_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 96);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("visible", ctx_r0.diffsLoading);
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r12.value);
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_1_Template, 2, 0, "span", 106)(2, NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_2_Template, 2, 0, "span", 107)(3, NrtRunsComponent_div_93_dx_data_grid_7_div_10_span_3_Template, 2, 0, "span", 107);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r13.value === "InBothButDiff");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r13.value === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r13.value === "OnlyInTarget");
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_11_span_2_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 118);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("pos-delta", ctx_r0.calcDelta(df_r14.ref, df_r14.tgt) > 0)("neg-delta", ctx_r0.calcDelta(df_r14.ref, df_r14.tgt) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", ctx_r0.calcDelta(df_r14.ref, df_r14.tgt) > 0 ? "+" : "", "", \u0275\u0275pipeBind2(3, 6, ctx_r0.calcDelta(df_r14.ref, df_r14.tgt), "1.2-4"), ") ");
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_11_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112)(1, "span", 113);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 114);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 115);
    \u0275\u0275text(6, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 116);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, NrtRunsComponent_div_93_dx_data_grid_7_div_11_span_2_ng_container_9_Template, 4, 9, "ng-container", 117);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const df_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r14.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r14.ref);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(df_r14.tgt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isNumeric(df_r14.ref) && ctx_r0.isNumeric(df_r14.tgt));
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 110);
    \u0275\u0275template(2, NrtRunsComponent_div_93_dx_data_grid_7_div_11_span_2_Template, 10, 4, "span", 111);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r15 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.parseDiffs(d_r15.value));
  }
}
function NrtRunsComponent_div_93_dx_data_grid_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dx-data-grid", 97);
    \u0275\u0275element(1, "dxo-paging", 98)(2, "dxo-pager", 99)(3, "dxi-column", 100)(4, "dxi-column", 101)(5, "dxi-column", 102)(6, "dxi-column", 103)(7, "dxi-column", 104)(8, "dxi-column", 105);
    \u0275\u0275template(9, NrtRunsComponent_div_93_dx_data_grid_7_div_9_Template, 3, 1, "div", 53)(10, NrtRunsComponent_div_93_dx_data_grid_7_div_10_Template, 4, 3, "div", 53)(11, NrtRunsComponent_div_93_dx_data_grid_7_div_11_Template, 3, 1, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", ctx_r0.diffs)("showBorders", false)("showColumnLines", false)("hoverStateEnabled", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 50);
    \u0275\u0275advance();
    \u0275\u0275property("showInfo", true);
    \u0275\u0275advance();
    \u0275\u0275property("width", 130);
    \u0275\u0275advance();
    \u0275\u0275property("width", 110);
    \u0275\u0275advance();
    \u0275\u0275property("width", 100);
    \u0275\u0275advance();
    \u0275\u0275property("width", 120);
    \u0275\u0275advance();
    \u0275\u0275property("width", 130);
    \u0275\u0275advance(2);
    \u0275\u0275property("dxTemplateOf", "cellMono");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffTypeTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffsTpl");
  }
}
function NrtRunsComponent_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275template(1, NrtRunsComponent_div_93_div_1_Template, 46, 19, "div", 84);
    \u0275\u0275elementStart(2, "div", 85)(3, "dx-select-box", 86);
    \u0275\u0275listener("onValueChanged", function NrtRunsComponent_div_93_Template_dx_select_box_onValueChanged_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDiffTypeChange($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, NrtRunsComponent_div_93_dx_load_indicator_6_Template, 1, 1, "dx-load-indicator", 87)(7, NrtRunsComponent_div_93_dx_data_grid_7_Template, 12, 14, "dx-data-grid", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun);
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.diffTypeOptions)("value", ctx_r0.diffTypeFilter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.diffs.length, " rows");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.diffsLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.diffsLoading);
  }
}
var NrtRunsComponent = class _NrtRunsComponent {
  constructor(viewer) {
    this.viewer = viewer;
    this.loading = true;
    this.runs = [];
    this.totalCount = 0;
    this.page = 1;
    this.pageSize = 20;
    this.statusFilter = null;
    this.statusOptions = [
      { value: null, label: "All Statuses" },
      { value: "pass", label: "Pass" },
      { value: "fail", label: "Fail" }
    ];
    this.detailVisible = false;
    this.selectedRun = null;
    this.diffs = [];
    this.diffsLoading = false;
    this.diffTypeFilter = null;
    this.diffTypeOptions = [
      { value: null, label: "All Types" },
      { value: "InBothButDiff", label: "In Both (diff)" },
      { value: "OnlyInReference", label: "Only in Ref" },
      { value: "OnlyInTarget", label: "Only in Target" }
    ];
    this.summaryStats = { totalRuns: 0, passRate: 0, totalDiffs: 0, onlyRef: 0, onlyTgt: 0 };
  }
  ngOnInit() {
    this.loadRuns();
  }
  loadRuns() {
    this.loading = true;
    this.viewer.getRuns(this.page, this.pageSize).subscribe({
      next: (result) => {
        this.runs = this.applyFilter(result.items);
        this.totalCount = result.totalCount;
        this.buildSummary(result.items);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  applyFilter(items) {
    if (!this.statusFilter)
      return items;
    return items.filter((r) => this.statusFilter === "pass" ? r.passed === true : r.passed === false);
  }
  buildSummary(items) {
    const completed = items.filter((r) => r.passed !== null);
    const passed = completed.filter((r) => r.passed === true).length;
    this.summaryStats = {
      totalRuns: items.length,
      passRate: completed.length ? Math.round(passed / completed.length * 100) : 0,
      totalDiffs: items.reduce((s, r) => s + (r.diffRowCount ?? 0), 0),
      onlyRef: items.reduce((s, r) => s + (r.onlyInRefCount ?? 0), 0),
      onlyTgt: items.reduce((s, r) => s + (r.onlyInTgtCount ?? 0), 0)
    };
  }
  onStatusFilterChange(val) {
    this.statusFilter = val;
    this.loadRuns();
  }
  onRowClick(e) {
    this.selectedRun = e.data;
    this.detailVisible = true;
    this.diffs = [];
    this.diffTypeFilter = null;
    this.loadDiffs();
  }
  loadDiffs() {
    if (!this.selectedRun)
      return;
    this.diffsLoading = true;
    this.viewer.getDiffsForRun(this.selectedRun.runId, {
      page: 1,
      pageSize: 100,
      diffType: this.diffTypeFilter ?? void 0
    }).subscribe({
      next: (result) => {
        this.diffs = result.items;
        this.diffsLoading = false;
      },
      error: () => {
        this.diffsLoading = false;
      }
    });
  }
  onDiffTypeChange(val) {
    this.diffTypeFilter = val;
    this.loadDiffs();
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
  get gaugeColor() {
    if (this.summaryStats.passRate >= 80)
      return "#3ecf8e";
    if (this.summaryStats.passRate >= 50)
      return "#f5a623";
    return "#f66d6d";
  }
  get passCount() {
    return this.runs.filter((r) => r.passed === true).length;
  }
  get failCount() {
    return this.runs.filter((r) => r.passed === false).length;
  }
  formatTooltip(arg) {
    return `${arg.valueText}%`;
  }
  isNumeric(v) {
    return typeof v === "number";
  }
  calcDelta(ref, tgt) {
    return tgt - ref;
  }
  static {
    this.\u0275fac = function NrtRunsComponent_Factory(t) {
      return new (t || _NrtRunsComponent)(\u0275\u0275directiveInject(ResultViewerService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NrtRunsComponent, selectors: [["app-nrt-runs"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 94, vars: 59, consts: [[1, "nrt-runs-layout"], [1, "grid-pane"], [1, "page-header"], [1, "actions"], ["routerLink", "/new-run", 1, "btn", "btn-primary"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "btn", "btn-outline"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "filter-bar"], ["displayExpr", "label", "valueExpr", "value", "placeholder", "Status", "width", "140", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "count-badge"], ["height", "36", "width", "36", "class", "grid-loader", 3, "visible", 4, "ngIf"], ["class", "grid-wrap card", 4, "ngIf"], [1, "summary-panel", "card"], [1, "panel-title"], [1, "panel-sub"], [1, "gauge-wrap"], [3, "value"], [3, "startValue", "endValue", "tickInterval"], [3, "customizeText"], ["color", "#f66d6d", 3, "startValue", "endValue"], ["color", "#f5a623", 3, "startValue", "endValue"], ["color", "#3ecf8e", 3, "startValue", "endValue"], ["type", "twoColorNeedle", 3, "color"], [3, "startAngle", "endAngle"], [1, "gauge-label"], [1, "gauge-value"], [1, "gauge-sub"], [1, "counters"], [1, "counter-row"], [1, "counter-label"], [1, "counter-value"], [1, "counter-value", "pass-text"], [1, "counter-value", "fail-text"], [1, "divider"], [1, "section-title", 2, "margin-bottom", "12px"], [1, "top-list"], ["class", "top-item", 4, "ngFor", "ngForOf"], [3, "visibleChange", "visible", "width", "height", "showTitle", "title", "dragEnabled", "resizeEnabled", "showCloseButton"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], ["height", "36", "width", "36", 1, "grid-loader", 3, "visible"], [1, "grid-wrap", "card"], ["keyExpr", "runId", 3, "onRowClick", "dataSource", "showBorders", "showColumnLines", "rowAlternationEnabled", "hoverStateEnabled"], ["mode", "multiple", "showCheckBoxesMode", "onClick"], [3, "enabled"], ["mode", "virtual"], ["dataField", "runId", "caption", "#", "cellTemplate", "idTpl", 3, "width", "allowSorting"], [4, "dxTemplate", "dxTemplateOf"], ["dataField", "scenarioName", "caption", "Scenario", 3, "minWidth"], ["caption", "Ref \u2192 Target", "cellTemplate", "versionTpl", 3, "minWidth"], ["dataField", "valuationDate", "caption", "Val Date", "cellTemplate", "dateTpl", 3, "width"], ["dataField", "passed", "caption", "Status", "cellTemplate", "statusTpl", 3, "width"], ["dataField", "refRowCount", "caption", "Total Rows", "cellTemplate", "rowsTpl", 3, "width"], ["dataField", "diffRowCount", "caption", "Diffs", "cellTemplate", "diffTpl", 3, "width"], ["dataField", "runTimestamp", "caption", "Date", "cellTemplate", "tsTpl", "sortOrder", "desc", 3, "width"], [1, "run-id"], [1, "version-pair"], [1, "ver", "ref"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M5 12h14M12 5l7 7-7 7"], [1, "ver", "tgt"], [1, "mono-sm"], ["class", "badge pass", 4, "ngIf"], ["class", "badge fail", 4, "ngIf"], ["class", "badge warn", 4, "ngIf"], [1, "badge", "pass"], [1, "dot"], [1, "badge", "fail"], [1, "badge", "warn"], [1, "diff-num"], [1, "mono-sm", "ts"], [1, "top-item"], [1, "top-name"], ["class", "badge pass sm", 4, "ngIf"], ["class", "badge fail sm", 4, "ngIf"], [1, "badge", "pass", "sm"], [1, "badge", "fail", "sm"], [1, "popup-content"], ["class", "popup-meta", 4, "ngIf"], [1, "popup-filter"], ["displayExpr", "label", "valueExpr", "value", "width", "200", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], ["height", "30", "width", "30", 3, "visible", 4, "ngIf"], ["keyExpr", "id", "height", "380", 3, "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled", 4, "ngIf"], [1, "popup-meta"], [1, "meta-grid"], [1, "meta-item"], [1, "meta-label"], [1, "meta-value"], [1, "meta-value", "mono-sm"], [1, "meta-value", "warn-text"], ["height", "30", "width", "30", 3, "visible"], ["keyExpr", "id", "height", "380", 3, "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled"], [3, "pageSize"], [3, "showInfo"], ["dataField", "tradeId", "caption", "Trade ID", "cellTemplate", "cellMono", 3, "width"], ["dataField", "book", "caption", "Book", 3, "width"], ["dataField", "desk", "caption", "Desk", 3, "width"], ["dataField", "riskFactor", "caption", "Risk Factor", 3, "width"], ["dataField", "diffType", "caption", "Type", "cellTemplate", "diffTypeTpl", 3, "width"], ["dataField", "diffs", "caption", "Diffs", "cellTemplate", "diffsTpl"], ["class", "badge diff sm", 4, "ngIf"], ["class", "badge warn sm", 4, "ngIf"], [1, "badge", "diff", "sm"], [1, "badge", "warn", "sm"], [1, "diffs-inline"], ["class", "diff-field", 4, "ngFor", "ngForOf"], [1, "diff-field"], [1, "df-name"], [1, "df-ref"], [1, "df-arrow"], [1, "df-tgt"], [4, "ngIf"], [1, "df-delta"]], template: function NrtRunsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "NRT Runs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "a", 4);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(7, "svg", 5);
        \u0275\u0275element(8, "line", 6)(9, "line", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " New Run ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 9);
        \u0275\u0275element(13, "path", 10)(14, "polyline", 11)(15, "line", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, " Export ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(17, "div", 13)(18, "dx-select-box", 14);
        \u0275\u0275listener("onValueChanged", function NrtRunsComponent_Template_dx_select_box_onValueChanged_18_listener($event) {
          return ctx.onStatusFilterChange($event.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 15);
        \u0275\u0275listener("click", function NrtRunsComponent_Template_button_click_19_listener() {
          return ctx.onStatusFilterChange(null);
        });
        \u0275\u0275text(20, " Clear filters ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 16);
        \u0275\u0275text(22);
        \u0275\u0275pipe(23, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, NrtRunsComponent_dx_load_indicator_24_Template, 1, 1, "dx-load-indicator", 17)(25, NrtRunsComponent_div_25_Template, 20, 22, "div", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "aside", 19)(27, "div", 20);
        \u0275\u0275text(28, "COMPARISON SUMMARY");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 21);
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 22)(32, "dx-circular-gauge", 23)(33, "dxo-scale", 24);
        \u0275\u0275element(34, "dxo-label", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "dxo-range-container");
        \u0275\u0275element(36, "dxi-range", 26)(37, "dxi-range", 27)(38, "dxi-range", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275element(39, "dxo-value-indicator", 29)(40, "dxo-geometry", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "div", 31)(42, "span", 32);
        \u0275\u0275text(43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "span", 33);
        \u0275\u0275text(45, "Pass Rate");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(46, "div", 34)(47, "div", 35)(48, "span", 36);
        \u0275\u0275text(49, "Total Runs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "span", 37);
        \u0275\u0275text(51);
        \u0275\u0275pipe(52, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div", 35)(54, "span", 36);
        \u0275\u0275text(55, "Passed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "span", 38);
        \u0275\u0275text(57);
        \u0275\u0275pipe(58, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "div", 35)(60, "span", 36);
        \u0275\u0275text(61, "Failed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "span", 39);
        \u0275\u0275text(63);
        \u0275\u0275pipe(64, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(65, "div", 40);
        \u0275\u0275elementStart(66, "div", 41);
        \u0275\u0275text(67, "DIFF BREAKDOWN");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "div", 34)(69, "div", 35)(70, "span", 36);
        \u0275\u0275text(71, "In Both (diff)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "span", 37);
        \u0275\u0275text(73);
        \u0275\u0275pipe(74, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(75, "div", 35)(76, "span", 36);
        \u0275\u0275text(77, "Only in Reference");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "span", 37);
        \u0275\u0275text(79);
        \u0275\u0275pipe(80, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(81, "div", 35)(82, "span", 36);
        \u0275\u0275text(83, "Only in Target");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "span", 37);
        \u0275\u0275text(85);
        \u0275\u0275pipe(86, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(87, "div", 40);
        \u0275\u0275elementStart(88, "div", 41);
        \u0275\u0275text(89, "TOP SELLERS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "div", 42);
        \u0275\u0275template(91, NrtRunsComponent_div_91_Template, 5, 3, "div", 43);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(92, "dx-popup", 44);
        \u0275\u0275twoWayListener("visibleChange", function NrtRunsComponent_Template_dx_popup_visibleChange_92_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event);
          return $event;
        });
        \u0275\u0275template(93, NrtRunsComponent_div_93_Template, 8, 6, "div", 45);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(18);
        \u0275\u0275property("items", ctx.statusOptions)("value", ctx.statusFilter);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(23, 45, ctx.totalCount), " runs");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Last ", ctx.runs.length, " runs");
        \u0275\u0275advance(2);
        \u0275\u0275property("value", ctx.summaryStats.passRate);
        \u0275\u0275advance();
        \u0275\u0275property("startValue", 0)("endValue", 100)("tickInterval", 25);
        \u0275\u0275advance();
        \u0275\u0275property("customizeText", ctx.formatTooltip);
        \u0275\u0275advance(2);
        \u0275\u0275property("startValue", 0)("endValue", 50);
        \u0275\u0275advance();
        \u0275\u0275property("startValue", 50)("endValue", 80);
        \u0275\u0275advance();
        \u0275\u0275property("startValue", 80)("endValue", 100);
        \u0275\u0275advance();
        \u0275\u0275property("color", ctx.gaugeColor);
        \u0275\u0275advance();
        \u0275\u0275property("startAngle", 180)("endAngle", 0);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("color", ctx.gaugeColor);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1("", ctx.summaryStats.passRate, "%");
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 47, ctx.summaryStats.totalRuns));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(58, 49, ctx.passCount));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(64, 51, ctx.failCount));
        \u0275\u0275advance(9);
        \u0275\u0275classProp("fail-text", ctx.summaryStats.totalDiffs > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(74, 53, ctx.summaryStats.totalDiffs), " ");
        \u0275\u0275advance(5);
        \u0275\u0275classProp("warn-text", ctx.summaryStats.onlyRef > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(80, 55, ctx.summaryStats.onlyRef), " ");
        \u0275\u0275advance(5);
        \u0275\u0275classProp("warn-text", ctx.summaryStats.onlyTgt > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(86, 57, ctx.summaryStats.onlyTgt), " ");
        \u0275\u0275advance(6);
        \u0275\u0275property("ngForOf", ctx.runs.slice(0, 3));
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.detailVisible);
        \u0275\u0275property("width", 800)("height", "80vh")("showTitle", true)("title", ctx.selectedRun ? "Run #" + ctx.selectedRun.runId + " \u2014 " + ctx.selectedRun.scenarioName : "Run Detail")("dragEnabled", true)("resizeEnabled", true)("showCloseButton", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      DecimalPipe,
      DatePipe,
      RouterLink,
      DxDataGridModule,
      DxDataGridComponent,
      DxoSelectionComponent,
      DxiColumnComponent,
      DxoLabelComponent,
      DxoPagerComponent,
      DxoPagingComponent,
      DxoScrollingComponent,
      DxTemplateDirective,
      DxPopupModule,
      DxPopupComponent,
      DxButtonModule,
      DxSelectBoxModule,
      DxSelectBoxComponent,
      DxLoadIndicatorModule,
      DxLoadIndicatorComponent,
      DxCircularGaugeModule,
      DxCircularGaugeComponent,
      DxoGeometryComponent,
      DxoRangeContainerComponent,
      DxiRangeComponent,
      DxoScaleComponent,
      DxoValueIndicatorComponent,
      DxTabsModule
    ], styles: ['\n\n.nrt-runs-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 290px;\n  gap: 20px;\n  align-items: start;\n  max-width: 1400px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--card-border);\n  color: var(--text-primary);\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--text-secondary);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.count-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  background: rgba(255, 255, 255, 0.06);\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.grid-loader[_ngcontent-%COMP%] {\n  display: block;\n  margin: 60px auto;\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.run-id[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.version-pair[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n}\n.version-pair[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  flex-shrink: 0;\n}\n.ver[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  padding: 2px 6px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.ver.ref[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.12);\n  color: var(--accent);\n}\n.ver.tgt[_ngcontent-%COMP%] {\n  background: rgba(62, 207, 142, 0.12);\n  color: var(--pass-color);\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.diff-num[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.diff-num.has-diff[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.ts[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.summary-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  padding: 20px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  letter-spacing: 0.7px;\n}\n.panel-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  margin-bottom: 16px;\n}\n.gauge-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  margin-bottom: 16px;\n}\n.gauge-wrap[_ngcontent-%COMP%]   dx-circular-gauge[_ngcontent-%COMP%] {\n  height: 150px;\n}\n.gauge-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: -10px;\n}\n.gauge-value[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n}\n.gauge-sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n}\n.counters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.counter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.counter-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.counter-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.pass-text[_ngcontent-%COMP%] {\n  color: var(--pass-color) !important;\n}\n.fail-text[_ngcontent-%COMP%] {\n  color: var(--fail-color) !important;\n}\n.warn-text[_ngcontent-%COMP%] {\n  color: var(--warn-color) !important;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--card-border);\n  margin: 14px 0;\n}\n.top-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.top-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.top-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-primary);\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.badge.sm[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 2px 7px;\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  height: 100%;\n  overflow-y: auto;\n}\n.popup-meta[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n.meta-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.meta-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.popup-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.diffs-inline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  font-size: 11px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n}\n.diff-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 5px;\n  padding: 3px 8px;\n  white-space: nowrap;\n}\n.df-name[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-right: 2px;\n}\n.df-ref[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.df-arrow[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  opacity: 0.4;\n  font-size: 10px;\n}\n.df-tgt[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.df-delta[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  font-size: 10px;\n  padding: 0 4px;\n  border-radius: 3px;\n  background: rgba(255, 255, 255, 0.06);\n}\n.pos-delta[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.neg-delta[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n/*# sourceMappingURL=nrt-runs.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NrtRunsComponent, { className: "NrtRunsComponent", filePath: "src\\app\\pages\\nrt-runs\\nrt-runs.component.ts", lineNumber: 29 });
})();
export {
  NrtRunsComponent
};
//# sourceMappingURL=chunk-6XIDA3U6.js.map
