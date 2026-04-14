import {
  ResultViewerService
} from "./chunk-UQDPMOCQ.js";
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
} from "./chunk-VGKFB52G.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
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
} from "./chunk-WGIWJJBP.js";

// src/app/pages/run-executions/run-executions.component.ts
function RunExecutionsComponent_dx_load_indicator_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 49);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("visible", ctx_r0.loading);
  }
}
function RunExecutionsComponent_div_30_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", d_r3.value, "");
  }
}
function RunExecutionsComponent_div_30_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 67)(2, "span", 68);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 69);
    \u0275\u0275element(5, "path", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 71);
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
function RunExecutionsComponent_div_30_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.value);
  }
}
function RunExecutionsComponent_div_30_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 73);
    \u0275\u0275element(2, "span", 74);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.workflowStatusClass(d_r6.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.workflowStatusLabel(d_r6.value), " ");
  }
}
function RunExecutionsComponent_div_30_div_15_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275text(2, "Pass");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_30_div_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275text(2, "Fail");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_30_div_15_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_30_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, RunExecutionsComponent_div_30_div_15_span_1_Template, 3, 0, "span", 75)(2, RunExecutionsComponent_div_30_div_15_span_2_Template, 3, 0, "span", 76)(3, RunExecutionsComponent_div_30_div_15_span_3_Template, 2, 0, "span", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r7.value === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r7.value === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r7.value === null);
  }
}
function RunExecutionsComponent_div_30_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, d_r8.value));
  }
}
function RunExecutionsComponent_div_30_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 81);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const d_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("has-diff", ((tmp_3_0 = d_r9.value) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, (tmp_4_0 = d_r9.value) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : 0));
  }
}
function RunExecutionsComponent_div_30_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 82);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r10.value, "MMM d, HH:mm"));
  }
}
function RunExecutionsComponent_div_30_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 83);
    \u0275\u0275listener("click", function RunExecutionsComponent_div_30_div_23_Template_button_click_1_listener($event) {
      const d_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.viewResults(d_r12.data.runId, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 84);
    \u0275\u0275element(3, "circle", 85)(4, "line", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " View Results ");
    \u0275\u0275elementEnd()();
  }
}
function RunExecutionsComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "dx-data-grid", 51);
    \u0275\u0275listener("onRowClick", function RunExecutionsComponent_div_30_Template_dx_data_grid_onRowClick_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRowClick($event));
    });
    \u0275\u0275element(2, "dxo-selection", 52)(3, "dxo-paging", 53)(4, "dxo-scrolling", 54)(5, "dxi-column", 55);
    \u0275\u0275template(6, RunExecutionsComponent_div_30_div_6_Template, 3, 1, "div", 56);
    \u0275\u0275element(7, "dxi-column", 57)(8, "dxi-column", 58);
    \u0275\u0275template(9, RunExecutionsComponent_div_30_div_9_Template, 8, 2, "div", 56);
    \u0275\u0275element(10, "dxi-column", 59);
    \u0275\u0275template(11, RunExecutionsComponent_div_30_div_11_Template, 3, 1, "div", 56);
    \u0275\u0275element(12, "dxi-column", 60);
    \u0275\u0275template(13, RunExecutionsComponent_div_30_div_13_Template, 4, 2, "div", 56);
    \u0275\u0275element(14, "dxi-column", 61);
    \u0275\u0275template(15, RunExecutionsComponent_div_30_div_15_Template, 4, 3, "div", 56);
    \u0275\u0275element(16, "dxi-column", 62);
    \u0275\u0275template(17, RunExecutionsComponent_div_30_div_17_Template, 4, 3, "div", 56);
    \u0275\u0275element(18, "dxi-column", 63);
    \u0275\u0275template(19, RunExecutionsComponent_div_30_div_19_Template, 4, 5, "div", 56);
    \u0275\u0275element(20, "dxi-column", 64);
    \u0275\u0275template(21, RunExecutionsComponent_div_30_div_21_Template, 4, 4, "div", 56);
    \u0275\u0275element(22, "dxi-column", 65);
    \u0275\u0275template(23, RunExecutionsComponent_div_30_div_23_Template, 6, 0, "div", 56);
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
    \u0275\u0275property("width", 130);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "wfStatusTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 90);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "resultTpl");
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
    \u0275\u0275advance();
    \u0275\u0275property("width", 130)("allowSorting", false);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "viewResultsTpl");
  }
}
function RunExecutionsComponent_div_96_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "PASS");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_96_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_96_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, RunExecutionsComponent_div_96_span_3_Template, 2, 0, "span", 89)(4, RunExecutionsComponent_div_96_span_4_Template, 2, 0, "span", 90)(5, RunExecutionsComponent_div_96_span_5_Template, 2, 0, "span", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const run_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(run_r13.scenarioName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r13.passed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r13.passed === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", run_r13.passed === null);
  }
}
function RunExecutionsComponent_div_98_div_1_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275text(2, "PASS");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_div_1_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275text(2, "FAIL");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_div_1_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_4_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 116);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r0.selectedRun.refCmdFinishedAt, "HH:mm:ss"), " ");
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2, "Ref command");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 73);
    \u0275\u0275element(4, "span", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, RunExecutionsComponent_div_98_div_1_div_47_div_4_span_6_Template, 3, 4, "span", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.workflowStatusClass((tmp_5_0 = ctx_r0.selectedRun.refCmdStatus) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedRun.refCmdStatus, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.refCmdFinishedAt);
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_5_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 116);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r0.selectedRun.tgtCmdFinishedAt, "HH:mm:ss"), " ");
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2, "Tgt command");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 73);
    \u0275\u0275element(4, "span", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, RunExecutionsComponent_div_98_div_1_div_47_div_5_span_6_Template, 3, 4, "span", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.workflowStatusClass((tmp_5_0 = ctx_r0.selectedRun.tgtCmdStatus) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedRun.tgtCmdStatus, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.tgtCmdFinishedAt);
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2, "Comparison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 117);
    \u0275\u0275element(4, "span", 74);
    \u0275\u0275text(5, "started");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 116);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, ctx_r0.selectedRun.comparisonStartedAt, "HH:mm:ss"));
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2, "Saving results");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 117);
    \u0275\u0275element(4, "span", 74);
    \u0275\u0275text(5, "started");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 116);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, ctx_r0.selectedRun.savingStartedAt, "HH:mm:ss"));
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "span", 114);
    \u0275\u0275text(2, "Finished");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 117);
    \u0275\u0275element(4, "span", 74);
    \u0275\u0275text(5, "done");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 116);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, ctx_r0.selectedRun.finishedAt, "HH:mm:ss"));
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.selectedRun.errorMessage, " ");
  }
}
function RunExecutionsComponent_div_98_div_1_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108)(1, "div", 109);
    \u0275\u0275text(2, "EXECUTION TIMELINE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 110);
    \u0275\u0275template(4, RunExecutionsComponent_div_98_div_1_div_47_div_4_Template, 7, 3, "div", 111)(5, RunExecutionsComponent_div_98_div_1_div_47_div_5_Template, 7, 3, "div", 111)(6, RunExecutionsComponent_div_98_div_1_div_47_div_6_Template, 9, 4, "div", 111)(7, RunExecutionsComponent_div_98_div_1_div_47_div_7_Template, 9, 4, "div", 111)(8, RunExecutionsComponent_div_98_div_1_div_47_div_8_Template, 9, 4, "div", 111);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, RunExecutionsComponent_div_98_div_1_div_47_div_9_Template, 2, 1, "div", 112);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.refCmdStatus);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.tgtCmdStatus);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.comparisonStartedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.savingStartedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.finishedAt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.errorMessage);
  }
}
function RunExecutionsComponent_div_98_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101)(1, "div", 102)(2, "div", 103)(3, "span", 104);
    \u0275\u0275text(4, "Reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 105);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 103)(8, "span", 104);
    \u0275\u0275text(9, "Target");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 105);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 103)(13, "span", 104);
    \u0275\u0275text(14, "Val Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 106);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 103)(18, "span", 104);
    \u0275\u0275text(19, "Workflow");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 73);
    \u0275\u0275element(21, "span", 74);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 103)(24, "span", 104);
    \u0275\u0275text(25, "Result");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, RunExecutionsComponent_div_98_div_1_span_26_Template, 3, 0, "span", 75)(27, RunExecutionsComponent_div_98_div_1_span_27_Template, 3, 0, "span", 76)(28, RunExecutionsComponent_div_98_div_1_span_28_Template, 2, 0, "span", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 103)(30, "span", 104);
    \u0275\u0275text(31, "Ref Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 105);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 103)(36, "span", 104);
    \u0275\u0275text(37, "Tgt Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 105);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 103)(42, "span", 104);
    \u0275\u0275text(43, "Diffs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 105);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(47, RunExecutionsComponent_div_98_div_1_div_47_Template, 10, 6, "div", 107);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.referenceVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.targetVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.selectedRun.valuationDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r0.workflowStatusClass(ctx_r0.selectedRun.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.workflowStatusLabel(ctx_r0.selectedRun.status), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.passed === true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.passed === false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.passed === null);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 14, ctx_r0.selectedRun.refRowCount));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 16, ctx_r0.selectedRun.tgtRowCount));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("fail-text", ((tmp_13_0 = ctx_r0.selectedRun.diffRowCount) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(46, 18, ctx_r0.selectedRun.diffRowCount), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.selectedRun.refCmdStatus || ctx_r0.selectedRun.comparisonStartedAt);
  }
}
function RunExecutionsComponent_div_98_dx_load_indicator_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 119);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("visible", ctx_r0.diffsLoading);
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 127);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 128);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 128);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_1_Template, 2, 0, "span", 125)(2, RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_2_Template, 2, 0, "span", 126)(3, RunExecutionsComponent_div_98_dx_data_grid_7_div_5_span_3_Template, 2, 0, "span", 126);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r15.value === "InBothButDiff");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r15.value === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r15.value === "OnlyInTarget");
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_6_span_2_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 137);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("pos-delta", ctx_r0.calcDelta(df_r16.ref, df_r16.tgt) > 0)("neg-delta", ctx_r0.calcDelta(df_r16.ref, df_r16.tgt) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", ctx_r0.calcDelta(df_r16.ref, df_r16.tgt) > 0 ? "+" : "", "", \u0275\u0275pipeBind2(3, 6, ctx_r0.calcDelta(df_r16.ref, df_r16.tgt), "1.2-4"), ") ");
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 131)(1, "span", 132);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 133);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 134);
    \u0275\u0275text(6, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 135);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, RunExecutionsComponent_div_98_dx_data_grid_7_div_6_span_2_ng_container_9_Template, 4, 9, "ng-container", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const df_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r16.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r16.ref);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(df_r16.tgt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isNumeric(df_r16.ref) && ctx_r0.isNumeric(df_r16.tgt));
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 129);
    \u0275\u0275template(2, RunExecutionsComponent_div_98_dx_data_grid_7_div_6_span_2_Template, 10, 4, "span", 130);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r17 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.parseDiffs(d_r17.value));
  }
}
function RunExecutionsComponent_div_98_dx_data_grid_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dx-data-grid", 120);
    \u0275\u0275element(1, "dxo-paging", 121)(2, "dxo-pager", 122)(3, "dxi-column", 123)(4, "dxi-column", 124);
    \u0275\u0275template(5, RunExecutionsComponent_div_98_dx_data_grid_7_div_5_Template, 4, 3, "div", 56)(6, RunExecutionsComponent_div_98_dx_data_grid_7_div_6_Template, 3, 1, "div", 56);
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
    \u0275\u0275advance(2);
    \u0275\u0275property("dxTemplateOf", "diffTypeTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffsTpl");
  }
}
function RunExecutionsComponent_div_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275template(1, RunExecutionsComponent_div_98_div_1_Template, 48, 20, "div", 96);
    \u0275\u0275elementStart(2, "div", 97)(3, "dx-select-box", 98);
    \u0275\u0275listener("onValueChanged", function RunExecutionsComponent_div_98_Template_dx_select_box_onValueChanged_3_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDiffTypeChange($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, RunExecutionsComponent_div_98_dx_load_indicator_6_Template, 1, 1, "dx-load-indicator", 99)(7, RunExecutionsComponent_div_98_dx_data_grid_7_Template, 7, 9, "dx-data-grid", 100);
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
var RunExecutionsComponent = class _RunExecutionsComponent {
  constructor(viewer, router) {
    this.viewer = viewer;
    this.router = router;
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
  viewResults(runId, event) {
    event.stopPropagation();
    this.router.navigate(["/diff-results"], { queryParams: { runId } });
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
  /** CSS class for the workflow status badge. */
  workflowStatusClass(status) {
    switch (status) {
      case "completed":
        return "wf-completed";
      case "failed":
        return "wf-failed";
      case "pending":
        return "wf-pending";
      case "running_commands":
      case "running_comparison":
      case "saving_results":
        return "wf-running";
      default:
        return "wf-pending";
    }
  }
  /** Human-readable label for the workflow status. */
  workflowStatusLabel(status) {
    switch (status) {
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending";
      case "running_commands":
        return "Running cmds";
      case "running_comparison":
        return "Comparing";
      case "saving_results":
        return "Saving";
      default:
        return status;
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
    this.\u0275fac = function RunExecutionsComponent_Factory(t) {
      return new (t || _RunExecutionsComponent)(\u0275\u0275directiveInject(ResultViewerService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RunExecutionsComponent, selectors: [["app-run-executions"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 99, vars: 59, consts: [[1, "run-executions-layout"], [1, "grid-pane"], [1, "page-header"], [1, "actions"], ["routerLink", "/new-run", 1, "btn", "btn-primary"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["routerLink", "/run-definitions", 1, "btn", "btn-outline"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20"], ["d", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"], [1, "btn", "btn-outline"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "filter-bar"], ["displayExpr", "label", "valueExpr", "value", "placeholder", "Result", "width", "140", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "count-badge"], ["height", "36", "width", "36", "class", "grid-loader", 3, "visible", 4, "ngIf"], ["class", "grid-wrap card", 4, "ngIf"], [1, "summary-panel", "card"], [1, "panel-title"], [1, "panel-sub"], [1, "gauge-wrap"], [3, "value"], [3, "startValue", "endValue", "tickInterval"], [3, "customizeText"], ["color", "#f66d6d", 3, "startValue", "endValue"], ["color", "#f5a623", 3, "startValue", "endValue"], ["color", "#3ecf8e", 3, "startValue", "endValue"], ["type", "twoColorNeedle", 3, "color"], [3, "startAngle", "endAngle"], [1, "gauge-label"], [1, "gauge-value"], [1, "gauge-sub"], [1, "counters"], [1, "counter-row"], [1, "counter-label"], [1, "counter-value"], [1, "counter-value", "pass-text"], [1, "counter-value", "fail-text"], [1, "divider"], [1, "section-title", 2, "margin-bottom", "12px"], [1, "top-list"], ["class", "top-item", 4, "ngFor", "ngForOf"], [3, "visibleChange", "visible", "width", "height", "showTitle", "title", "dragEnabled", "resizeEnabled", "showCloseButton"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], ["height", "36", "width", "36", 1, "grid-loader", 3, "visible"], [1, "grid-wrap", "card"], ["keyExpr", "runId", 3, "onRowClick", "dataSource", "showBorders", "showColumnLines", "rowAlternationEnabled", "hoverStateEnabled"], ["mode", "multiple", "showCheckBoxesMode", "onClick"], [3, "enabled"], ["mode", "virtual"], ["dataField", "runId", "caption", "#", "cellTemplate", "idTpl", 3, "width", "allowSorting"], [4, "dxTemplate", "dxTemplateOf"], ["dataField", "scenarioName", "caption", "Scenario", 3, "minWidth"], ["caption", "Ref \u2192 Target", "cellTemplate", "versionTpl", 3, "minWidth"], ["dataField", "valuationDate", "caption", "Val Date", "cellTemplate", "dateTpl", 3, "width"], ["dataField", "status", "caption", "Status", "cellTemplate", "wfStatusTpl", 3, "width"], ["dataField", "passed", "caption", "Result", "cellTemplate", "resultTpl", 3, "width"], ["dataField", "refRowCount", "caption", "Total Rows", "cellTemplate", "rowsTpl", 3, "width"], ["dataField", "diffRowCount", "caption", "Diffs", "cellTemplate", "diffTpl", 3, "width"], ["dataField", "runTimestamp", "caption", "Date", "cellTemplate", "tsTpl", "sortOrder", "desc", 3, "width"], ["caption", "", "cellTemplate", "viewResultsTpl", 3, "width", "allowSorting"], [1, "run-id"], [1, "version-pair"], [1, "ver", "ref"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M5 12h14M12 5l7 7-7 7"], [1, "ver", "tgt"], [1, "mono-sm"], [1, "wf-badge", 3, "ngClass"], [1, "dot"], ["class", "badge pass", 4, "ngIf"], ["class", "badge fail", 4, "ngIf"], ["class", "badge gray", 4, "ngIf"], [1, "badge", "pass"], [1, "badge", "fail"], [1, "badge", "gray"], [1, "diff-num"], [1, "mono-sm", "ts"], [1, "btn-view-results", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], [1, "top-item"], [1, "top-name"], ["class", "badge pass sm", 4, "ngIf"], ["class", "badge fail sm", 4, "ngIf"], ["class", "badge gray sm", 4, "ngIf"], [1, "badge", "pass", "sm"], [1, "badge", "fail", "sm"], [1, "badge", "gray", "sm"], [1, "popup-content"], ["class", "popup-meta", 4, "ngIf"], [1, "popup-filter"], ["displayExpr", "label", "valueExpr", "value", "width", "200", "stylingMode", "outlined", 3, "onValueChanged", "items", "value"], ["height", "30", "width", "30", 3, "visible", 4, "ngIf"], ["keyExpr", "id", "height", "320", 3, "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled", 4, "ngIf"], [1, "popup-meta"], [1, "meta-grid"], [1, "meta-item"], [1, "meta-label"], [1, "meta-value"], [1, "meta-value", "mono-sm"], ["class", "phase-timeline", 4, "ngIf"], [1, "phase-timeline"], [1, "phase-title"], [1, "phase-rows"], ["class", "phase-row", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], [1, "phase-row"], [1, "phase-label"], ["class", "phase-ts mono-sm", 4, "ngIf"], [1, "phase-ts", "mono-sm"], [1, "wf-badge", "wf-completed"], [1, "error-msg"], ["height", "30", "width", "30", 3, "visible"], ["keyExpr", "id", "height", "320", 3, "dataSource", "showBorders", "showColumnLines", "hoverStateEnabled"], [3, "pageSize"], [3, "showInfo"], ["dataField", "diffType", "caption", "Type", "cellTemplate", "diffTypeTpl", 3, "width"], ["dataField", "diffs", "caption", "Diffs", "cellTemplate", "diffsTpl"], ["class", "badge diff sm", 4, "ngIf"], ["class", "badge warn sm", 4, "ngIf"], [1, "badge", "diff", "sm"], [1, "badge", "warn", "sm"], [1, "diffs-inline"], ["class", "diff-field", 4, "ngFor", "ngForOf"], [1, "diff-field"], [1, "df-name"], [1, "df-ref"], [1, "df-arrow"], [1, "df-tgt"], [4, "ngIf"], [1, "df-delta"]], template: function RunExecutionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Run Executions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "a", 4);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(7, "svg", 5);
        \u0275\u0275element(8, "line", 6)(9, "line", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " New Run ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "a", 8);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 9);
        \u0275\u0275element(13, "path", 10)(14, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Definitions ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(16, "button", 12);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 9);
        \u0275\u0275element(18, "path", 13)(19, "polyline", 14)(20, "line", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Export ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(22, "div", 16)(23, "dx-select-box", 17);
        \u0275\u0275listener("onValueChanged", function RunExecutionsComponent_Template_dx_select_box_onValueChanged_23_listener($event) {
          return ctx.onStatusFilterChange($event.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 18);
        \u0275\u0275listener("click", function RunExecutionsComponent_Template_button_click_24_listener() {
          return ctx.onStatusFilterChange(null);
        });
        \u0275\u0275text(25, " Clear filters ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 19);
        \u0275\u0275text(27);
        \u0275\u0275pipe(28, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(29, RunExecutionsComponent_dx_load_indicator_29_Template, 1, 1, "dx-load-indicator", 20)(30, RunExecutionsComponent_div_30_Template, 24, 27, "div", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "aside", 22)(32, "div", 23);
        \u0275\u0275text(33, "COMPARISON SUMMARY");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "div", 24);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "div", 25)(37, "dx-circular-gauge", 26)(38, "dxo-scale", 27);
        \u0275\u0275element(39, "dxo-label", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "dxo-range-container");
        \u0275\u0275element(41, "dxi-range", 29)(42, "dxi-range", 30)(43, "dxi-range", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "dxo-value-indicator", 32)(45, "dxo-geometry", 33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "div", 34)(47, "span", 35);
        \u0275\u0275text(48);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "span", 36);
        \u0275\u0275text(50, "Pass Rate");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(51, "div", 37)(52, "div", 38)(53, "span", 39);
        \u0275\u0275text(54, "Total Runs");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "span", 40);
        \u0275\u0275text(56);
        \u0275\u0275pipe(57, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "div", 38)(59, "span", 39);
        \u0275\u0275text(60, "Passed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "span", 41);
        \u0275\u0275text(62);
        \u0275\u0275pipe(63, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(64, "div", 38)(65, "span", 39);
        \u0275\u0275text(66, "Failed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "span", 42);
        \u0275\u0275text(68);
        \u0275\u0275pipe(69, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(70, "div", 43);
        \u0275\u0275elementStart(71, "div", 44);
        \u0275\u0275text(72, "DIFF BREAKDOWN");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "div", 37)(74, "div", 38)(75, "span", 39);
        \u0275\u0275text(76, "In Both (diff)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "span", 40);
        \u0275\u0275text(78);
        \u0275\u0275pipe(79, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(80, "div", 38)(81, "span", 39);
        \u0275\u0275text(82, "Only in Reference");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "span", 40);
        \u0275\u0275text(84);
        \u0275\u0275pipe(85, "number");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(86, "div", 38)(87, "span", 39);
        \u0275\u0275text(88, "Only in Target");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "span", 40);
        \u0275\u0275text(90);
        \u0275\u0275pipe(91, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(92, "div", 43);
        \u0275\u0275elementStart(93, "div", 44);
        \u0275\u0275text(94, "RECENT RUNS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "div", 45);
        \u0275\u0275template(96, RunExecutionsComponent_div_96_Template, 6, 4, "div", 46);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(97, "dx-popup", 47);
        \u0275\u0275twoWayListener("visibleChange", function RunExecutionsComponent_Template_dx_popup_visibleChange_97_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event);
          return $event;
        });
        \u0275\u0275template(98, RunExecutionsComponent_div_98_Template, 8, 6, "div", 48);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(23);
        \u0275\u0275property("items", ctx.statusOptions)("value", ctx.statusFilter);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(28, 45, ctx.totalCount), " executions");
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
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(57, 47, ctx.summaryStats.totalRuns));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(63, 49, ctx.passCount));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(69, 51, ctx.failCount));
        \u0275\u0275advance(9);
        \u0275\u0275classProp("fail-text", ctx.summaryStats.totalDiffs > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(79, 53, ctx.summaryStats.totalDiffs), " ");
        \u0275\u0275advance(5);
        \u0275\u0275classProp("warn-text", ctx.summaryStats.onlyRef > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(85, 55, ctx.summaryStats.onlyRef), " ");
        \u0275\u0275advance(5);
        \u0275\u0275classProp("warn-text", ctx.summaryStats.onlyTgt > 0);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(91, 57, ctx.summaryStats.onlyTgt), " ");
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
      NgClass,
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
    ], styles: ['\n\n.run-executions-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 290px;\n  gap: 20px;\n  align-items: start;\n  max-width: 1400px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--card-border);\n  color: var(--text-primary);\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--text-secondary);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.count-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  background: rgba(255, 255, 255, 0.06);\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.grid-loader[_ngcontent-%COMP%] {\n  display: block;\n  margin: 60px auto;\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.run-id[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.version-pair[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n}\n.version-pair[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  flex-shrink: 0;\n}\n.ver[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  padding: 2px 6px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.ver.ref[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.12);\n  color: var(--accent);\n}\n.ver.tgt[_ngcontent-%COMP%] {\n  background: rgba(62, 207, 142, 0.12);\n  color: var(--pass-color);\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.diff-num[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.diff-num.has-diff[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.ts[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.wf-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 3px 8px;\n  border-radius: 20px;\n}\n.wf-badge[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.wf-completed[_ngcontent-%COMP%] {\n  background: rgba(62, 207, 142, 0.12);\n  color: var(--pass-color, #3ecf8e);\n}\n.wf-completed[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--pass-color, #3ecf8e);\n}\n.wf-failed[_ngcontent-%COMP%] {\n  background: rgba(246, 109, 109, 0.12);\n  color: var(--fail-color, #f66d6d);\n}\n.wf-failed[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--fail-color, #f66d6d);\n}\n.wf-running[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.12);\n  color: var(--accent, #4f8ef7);\n}\n.wf-running[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--accent, #4f8ef7);\n  animation: _ngcontent-%COMP%_pulse 1.2s ease-in-out infinite;\n}\n.wf-pending[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-secondary);\n}\n.wf-pending[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--text-secondary);\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.summary-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  padding: 20px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  letter-spacing: 0.7px;\n}\n.panel-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  margin-bottom: 16px;\n}\n.gauge-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  margin-bottom: 16px;\n}\n.gauge-wrap[_ngcontent-%COMP%]   dx-circular-gauge[_ngcontent-%COMP%] {\n  height: 150px;\n}\n.gauge-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: -10px;\n}\n.gauge-value[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n}\n.gauge-sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n}\n.counters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.counter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.counter-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.counter-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.pass-text[_ngcontent-%COMP%] {\n  color: var(--pass-color) !important;\n}\n.fail-text[_ngcontent-%COMP%] {\n  color: var(--fail-color) !important;\n}\n.warn-text[_ngcontent-%COMP%] {\n  color: var(--warn-color) !important;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  letter-spacing: 0.7px;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--card-border);\n  margin: 14px 0;\n}\n.top-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.top-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.top-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-primary);\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 3px 8px;\n  border-radius: 20px;\n}\n.badge[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.badge.pass[_ngcontent-%COMP%] {\n  background: rgba(62, 207, 142, 0.12);\n  color: var(--pass-color, #3ecf8e);\n}\n.badge.pass[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--pass-color, #3ecf8e);\n}\n.badge.fail[_ngcontent-%COMP%] {\n  background: rgba(246, 109, 109, 0.12);\n  color: var(--fail-color, #f66d6d);\n}\n.badge.fail[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: var(--fail-color, #f66d6d);\n}\n.badge.warn[_ngcontent-%COMP%] {\n  background: rgba(245, 166, 35, 0.12);\n  color: var(--warn-color, #f5a623);\n}\n.badge.diff[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.12);\n  color: var(--accent, #4f8ef7);\n}\n.badge.gray[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-secondary);\n}\n.badge.sm[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 2px 7px;\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  height: 100%;\n  overflow-y: auto;\n}\n.popup-meta[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n.meta-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.meta-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.phase-timeline[_ngcontent-%COMP%] {\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 12px 14px;\n  margin-bottom: 14px;\n}\n.phase-title[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.6px;\n  color: var(--text-secondary);\n  margin-bottom: 10px;\n}\n.phase-rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.phase-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.phase-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  width: 110px;\n  flex-shrink: 0;\n}\n.phase-ts[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--text-secondary);\n}\n.error-msg[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  font-size: 12px;\n  color: var(--fail-color, #f66d6d);\n  background: rgba(246, 109, 109, 0.08);\n  border-radius: 6px;\n  padding: 8px 10px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  word-break: break-word;\n}\n.popup-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.diffs-inline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 5px;\n  font-size: 11px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  overflow: hidden;\n}\n.diff-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 5px;\n  padding: 3px 8px;\n  white-space: nowrap;\n}\n.df-name[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-right: 2px;\n}\n.df-ref[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.df-arrow[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  opacity: 0.4;\n  font-size: 10px;\n}\n.df-tgt[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.df-delta[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  font-size: 10px;\n  padding: 0 4px;\n  border-radius: 3px;\n  background: rgba(255, 255, 255, 0.06);\n}\n.pos-delta[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.neg-delta[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.btn-view-results[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--accent-color, #4f8ef7);\n  background: rgba(79, 142, 247, 0.1);\n  border: 1px solid rgba(79, 142, 247, 0.25);\n  border-radius: 5px;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background 0.15s, border-color 0.15s;\n}\n.btn-view-results[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 142, 247, 0.2);\n  border-color: rgba(79, 142, 247, 0.45);\n}\n/*# sourceMappingURL=run-executions.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RunExecutionsComponent, { className: "RunExecutionsComponent", filePath: "src\\app\\pages\\run-executions\\run-executions.component.ts", lineNumber: 28 });
})();
export {
  RunExecutionsComponent
};
//# sourceMappingURL=chunk-IJJCKAX4.js.map
