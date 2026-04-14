import {
  ResultViewerService
} from "./chunk-UQDPMOCQ.js";
import {
  DxButtonComponent,
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxListComponent,
  DxListModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxNumberBoxComponent,
  DxNumberBoxModule,
  DxPopupComponent,
  DxPopupModule,
  DxSelectBoxComponent,
  DxSelectBoxModule,
  DxTabsComponent,
  DxTabsModule,
  DxTemplateDirective,
  DxTextBoxModule,
  DxoPagerComponent,
  DxoPagingComponent,
  DxoScrollingComponent,
  environment
} from "./chunk-VGKFB52G.js";
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
  forkJoin,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
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
} from "./chunk-WGIWJJBP.js";

// src/app/core/models/nrt.models.ts
function parseColumnSchema(run) {
  if (!run.columnSchemaJson)
    return [];
  try {
    const raw = JSON.parse(run.columnSchemaJson);
    return raw.map((c) => ({
      name: c.name ?? c.Name ?? "",
      type: c.type ?? c.Type ?? "string"
    }));
  } catch {
    return [];
  }
}

// src/app/pages/diff-results/diff-results.component.ts
function DiffResultsComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.copyFeedback);
  }
}
function DiffResultsComponent_div_14_Template(rf, ctx) {
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
function DiffResultsComponent_div_15_Template(rf, ctx) {
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
function DiffResultsComponent_ng_container_16_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, ' No "In Both (diff)" rows for this run. ');
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r4.value);
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.value);
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "Both (diff)");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Only Ref");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Only Tgt");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_1_Template, 2, 0, "span", 37)(2, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_2_Template, 2, 0, "span", 38)(3, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_span_3_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === "InBothButDiff");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r6.value === "OnlyInTarget");
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r7.value, "MMM d, HH:mm"));
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, d_r8.value, ctx_r0.getNumFmt(d_r8.column == null ? null : d_r8.column.dataField)));
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_span_1_Template, 3, 4, "span", 42)(2, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_span_2_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r8.value != null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r8.value == null);
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const d_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("pos", d_r9.value > 0)("neg", d_r9.value < 0)("zero", d_r9.value === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", d_r9.value > 0 ? "+" : "", "", \u0275\u0275pipeBind2(3, 8, d_r9.value, ctx_r0.getNumFmt(d_r9.column == null ? null : d_r9.column.dataField)), " ");
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_ng_container_1_Template, 4, 11, "ng-container", 10)(2, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_span_2_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r9.value != null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r9.value == null);
  }
}
function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dx-data-grid", 31);
    \u0275\u0275listener("onRowClick", function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_Template_dx_data_grid_onRowClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openDetail($event.data));
    })("onContextMenuPreparing", function DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_Template_dx_data_grid_onContextMenuPreparing_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onContextMenuPreparing($event));
    });
    \u0275\u0275element(1, "dxo-scrolling", 32)(2, "dxo-pager", 33)(3, "dxo-paging", 34);
    \u0275\u0275template(4, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_4_Template, 3, 1, "div", 35)(5, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_5_Template, 3, 1, "div", 35)(6, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_6_Template, 4, 3, "div", 35)(7, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_7_Template, 4, 4, "div", 35)(8, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_8_Template, 3, 2, "div", 35)(9, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_div_9_Template, 3, 2, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("dataSource", ctx_r0.flatDiffs)("columns", ctx_r0.columnDefs)("showBorders", false)("showColumnLines", true)("showRowLines", true)("rowAlternationEnabled", false)("hoverStateEnabled", true)("columnAutoWidth", false)("allowColumnResizing", true)("wordWrapEnabled", false)("cellHintEnabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("showInfo", true)("showNavigationButtons", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 100);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "idTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "monoTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "typeTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "numTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "diffValTpl");
  }
}
function DiffResultsComponent_ng_container_16_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_3_div_1_Template, 2, 0, "div", 28)(2, DiffResultsComponent_ng_container_16_div_3_dx_data_grid_2_Template, 10, 20, "dx-data-grid", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatDiffs.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatDiffs.length > 0);
  }
}
function DiffResultsComponent_ng_container_16_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, ' No "Only in Reference" rows for this run. ');
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r11.value);
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r12.value);
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r13.value, "MMM d, HH:mm"));
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, d_r14.value, ctx_r0.getNumFmt(d_r14.column == null ? null : d_r14.column.dataField)));
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_span_1_Template, 3, 4, "span", 42)(2, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_span_2_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r14.value != null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r14.value == null);
  }
}
function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dx-data-grid", 31);
    \u0275\u0275listener("onRowClick", function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_Template_dx_data_grid_onRowClick_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openDetail($event.data));
    })("onContextMenuPreparing", function DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_Template_dx_data_grid_onContextMenuPreparing_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onContextMenuPreparing($event));
    });
    \u0275\u0275element(1, "dxo-scrolling", 32)(2, "dxo-pager", 33)(3, "dxo-paging", 34);
    \u0275\u0275template(4, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_4_Template, 3, 1, "div", 35)(5, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_5_Template, 3, 1, "div", 35)(6, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_6_Template, 4, 4, "div", 35)(7, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_div_7_Template, 3, 2, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("dataSource", ctx_r0.flatRefOrphans)("columns", ctx_r0.orphanColsRef)("showBorders", false)("showColumnLines", true)("showRowLines", true)("rowAlternationEnabled", false)("hoverStateEnabled", true)("columnAutoWidth", false)("allowColumnResizing", true)("wordWrapEnabled", false)("cellHintEnabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("showInfo", true)("showNavigationButtons", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 100);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "idTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "monoTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "numTpl");
  }
}
function DiffResultsComponent_ng_container_16_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_4_div_1_Template, 2, 0, "div", 28)(2, DiffResultsComponent_ng_container_16_div_4_dx_data_grid_2_Template, 8, 18, "dx-data-grid", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatRefOrphans.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatRefOrphans.length > 0);
  }
}
function DiffResultsComponent_ng_container_16_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, ' No "Only in Target" rows for this run. ');
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r16 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r16.value);
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r17.value);
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r18.value, "MMM d, HH:mm"));
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, d_r19.value, ctx_r0.getNumFmt(d_r19.column == null ? null : d_r19.column.dataField)));
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_span_1_Template, 3, 4, "span", 42)(2, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_span_2_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r19.value != null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r19.value == null);
  }
}
function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dx-data-grid", 31);
    \u0275\u0275listener("onRowClick", function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_Template_dx_data_grid_onRowClick_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openDetail($event.data));
    })("onContextMenuPreparing", function DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_Template_dx_data_grid_onContextMenuPreparing_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onContextMenuPreparing($event));
    });
    \u0275\u0275element(1, "dxo-scrolling", 32)(2, "dxo-pager", 33)(3, "dxo-paging", 34);
    \u0275\u0275template(4, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_4_Template, 3, 1, "div", 35)(5, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_5_Template, 3, 1, "div", 35)(6, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_6_Template, 4, 4, "div", 35)(7, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_div_7_Template, 3, 2, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("dataSource", ctx_r0.flatTgtOrphans)("columns", ctx_r0.orphanColsTgt)("showBorders", false)("showColumnLines", true)("showRowLines", true)("rowAlternationEnabled", false)("hoverStateEnabled", true)("columnAutoWidth", false)("allowColumnResizing", true)("wordWrapEnabled", false)("cellHintEnabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("showInfo", true)("showNavigationButtons", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 100);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "idTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "monoTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "numTpl");
  }
}
function DiffResultsComponent_ng_container_16_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275template(1, DiffResultsComponent_ng_container_16_div_5_div_1_Template, 2, 0, "div", 28)(2, DiffResultsComponent_ng_container_16_div_5_dx_data_grid_2_Template, 8, 18, "dx-data-grid", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatTgtOrphans.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.flatTgtOrphans.length > 0);
  }
}
function DiffResultsComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 24)(2, "dx-tabs", 25);
    \u0275\u0275twoWayListener("selectedIndexChange", function DiffResultsComponent_ng_container_16_Template_dx_tabs_selectedIndexChange_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.activeTab, $event) || (ctx_r0.activeTab = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(3, DiffResultsComponent_ng_container_16_div_3_Template, 3, 2, "div", 26)(4, DiffResultsComponent_ng_container_16_div_4_Template, 3, 2, "div", 26)(5, DiffResultsComponent_ng_container_16_div_5_Template, 3, 2, "div", 26);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r0.tabs);
    \u0275\u0275twoWayProperty("selectedIndex", ctx_r0.activeTab);
    \u0275\u0275property("showNavButtons", false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === 2);
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1, " This row exists ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "only in the Reference");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " dataset \u2014 no matching Target row was found. ");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275text(1, " This row exists ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "only in the Target");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " dataset \u2014 no matching Reference row was found. ");
    \u0275\u0275elementEnd();
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const kv_r20 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kv_r20.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kv_r20.value);
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55);
    \u0275\u0275template(2, DiffResultsComponent_div_18_ng_container_1_div_3_div_2_Template, 5, 2, "div", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 55)(4, "div", 57)(5, "span", 58);
    \u0275\u0275text(6, "Scenario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 59);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 57)(10, "span", 58);
    \u0275\u0275text(11, "Ref Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 59);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 57)(15, "span", 58);
    \u0275\u0275text(16, "Tgt Ver.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 59);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const diff_r21 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.parsedKeyValues);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(diff_r21.scenarioName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r21.referenceVersion);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(diff_r21.targetVersion);
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_4_tr_15_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const df_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r0.calcDelta(df_r22.ref, df_r22.tgt), "1.4-4"), " ");
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_4_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 67);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 68);
    \u0275\u0275template(8, DiffResultsComponent_div_18_ng_container_1_div_4_tr_15_ng_container_8_Template, 3, 4, "ng-container", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const df_r22 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r22.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r22.ref);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(df_r22.tgt);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isNumeric(df_r22.ref) && ctx_r0.isNumeric(df_r22.tgt));
  }
}
function DiffResultsComponent_div_18_ng_container_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "div", 62);
    \u0275\u0275text(2, "Field Differences");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 63)(4, "thead")(5, "tr")(6, "th");
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
    \u0275\u0275template(15, DiffResultsComponent_div_18_ng_container_1_div_4_tr_15_Template, 9, 4, "tr", 64);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.parsedDiffs);
  }
}
function DiffResultsComponent_div_18_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DiffResultsComponent_div_18_ng_container_1_div_1_Template, 5, 0, "div", 48)(2, DiffResultsComponent_div_18_ng_container_1_div_2_Template, 5, 0, "div", 49)(3, DiffResultsComponent_div_18_ng_container_1_div_3_Template, 19, 4, "div", 50)(4, DiffResultsComponent_div_18_ng_container_1_div_4_Template, 16, 1, "div", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const diff_r21 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", diff_r21.diffType === "OnlyInReference");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", diff_r21.diffType === "OnlyInTarget");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.parsedKeyValues.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.parsedDiffs.length > 0);
  }
}
function DiffResultsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, DiffResultsComponent_div_18_ng_container_1_Template, 5, 4, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.selectedDiff);
  }
}
function DiffResultsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "p", 69);
    \u0275\u0275text(2, "Select the values to ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "keep");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " in the grid:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dx-list", 70);
    \u0275\u0275twoWayListener("selectedItemKeysChange", function DiffResultsComponent_div_20_Template_dx_list_selectedItemKeysChange_6_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.filterListSelectedKeys, $event) || (ctx_r0.filterListSelectedKeys = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 71)(8, "dx-button", 72);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_20_Template_dx_button_onClick_8_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilterList());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dx-button", 73);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_20_Template_dx_button_onClick_9_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.filterListVisible = false);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("dataSource", ctx_r0.filterListItems)("showSelectionControls", true);
    \u0275\u0275twoWayProperty("selectedItemKeys", ctx_r0.filterListSelectedKeys);
    \u0275\u0275property("height", 280);
  }
}
function DiffResultsComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "p", 69);
    \u0275\u0275text(2, "Number of decimal places for this column:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dx-number-box", 75);
    \u0275\u0275twoWayListener("valueChange", function DiffResultsComponent_div_22_Template_dx_number_box_valueChange_3_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.decimalInputValue, $event) || (ctx_r0.decimalInputValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 71)(5, "dx-button", 76);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_22_Template_dx_button_onClick_5_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyDecimalPlaces());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dx-button", 73);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_22_Template_dx_button_onClick_6_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.decimalVisible = false);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("value", ctx_r0.decimalInputValue);
    \u0275\u0275property("min", 0)("max", 10)("showSpinButtons", true);
  }
}
function DiffResultsComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "p", 69);
    \u0275\u0275text(2, "HTTP request used to load the current dataset:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "pre", 77);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 71)(6, "dx-button", 78);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_24_Template_dx_button_onClick_6_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.copyApiQuery());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dx-button", 79);
    \u0275\u0275listener("onClick", function DiffResultsComponent_div_24_Template_dx_button_onClick_7_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.apiQueryVisible = false);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.apiQueryText);
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
    this.filter = { page: 1, pageSize: 1e3 };
    this.activeTab = 0;
    this.tabs = [
      { text: "In Both (diff)", badge: "" },
      { text: "Only in Reference", badge: "" },
      { text: "Only in Target", badge: "" }
    ];
    this.columnDefs = [];
    this.flatDiffs = [];
    this.diffFields = [];
    this.orphanColsRef = [];
    this.flatRefOrphans = [];
    this.orphanColsTgt = [];
    this.flatTgtOrphans = [];
    this.detailVisible = false;
    this.selectedDiff = null;
    this.parsedDiffs = [];
    this.parsedKeyValues = [];
    this.activeGrid = null;
    this.ctxColumn = null;
    this.ctxValue = null;
    this.filterListVisible = false;
    this.filterListItems = [];
    this.filterListSelectedKeys = [];
    this.decimalVisible = false;
    this.decimalInputValue = 4;
    this.decimalMap = /* @__PURE__ */ new Map();
    this.apiQueryVisible = false;
    this.apiQueryText = "";
    this.copyFeedback = "";
  }
  ngOnInit() {
    this.viewer.getRuns(1, 200).subscribe({
      next: (result) => {
        this.runs = result.items.map((r) => __spreadProps(__spreadValues({}, r), {
          label: `#${r.runId} \u2014 ${r.scenarioName}  (${r.referenceVersion} \u2192 ${r.targetVersion})`
        }));
        this.runsLoading = false;
        if (this.runId)
          this.refreshTabBadges();
      },
      error: () => {
        this.runsLoading = false;
      }
    });
    this.route.queryParams.subscribe((params) => {
      const id = params["runId"];
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
  onRunChange(runId) {
    this.router.navigate(["/diff-results"], {
      queryParams: runId ? { runId } : {},
      replaceUrl: true
    });
  }
  loadDiffs() {
    this.loading = true;
    const base = {
      page: 1,
      pageSize: this.filter.pageSize
    };
    const call = (diffType) => {
      const f = __spreadProps(__spreadValues({}, base), { diffType });
      return this.runId ? this.viewer.getDiffsForRun(this.runId, f) : this.viewer.getDiffs(f);
    };
    forkJoin({
      inBoth: call("InBothButDiff"),
      onlyRef: call("OnlyInReference"),
      onlyTgt: call("OnlyInTarget")
    }).subscribe({
      next: ({ inBoth, onlyRef, onlyTgt }) => {
        this.totalCount = inBoth.totalCount + onlyRef.totalCount + onlyTgt.totalCount;
        this.buildDiffGrid(inBoth.items);
        const refResult = this.buildOrphanData(onlyRef.items);
        this.flatRefOrphans = refResult.flat;
        this.orphanColsRef = refResult.cols;
        const tgtResult = this.buildOrphanData(onlyTgt.items);
        this.flatTgtOrphans = tgtResult.flat;
        this.orphanColsTgt = tgtResult.cols;
        this.tabs = [
          { text: "In Both (diff)", badge: String(inBoth.totalCount) },
          { text: "Only in Reference", badge: String(onlyRef.totalCount) },
          { text: "Only in Target", badge: String(onlyTgt.totalCount) }
        ];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  applyFilters() {
    this.filter = __spreadProps(__spreadValues({}, this.filter), { page: 1 });
    this.loadDiffs();
  }
  clearFilters() {
    this.resetFilters();
    this.loadDiffs();
  }
  openDetail(diff) {
    const original = this.diffs.find((d) => d.id === diff.id) ?? diff;
    this.selectedDiff = original;
    this.parsedDiffs = this.parseDiffs(original.diffs);
    this.parsedKeyValues = this.parseCompareItems(original.compareItems);
    this.detailVisible = true;
  }
  // ── Build all grid data ───────────────────────────────────────────────────────
  buildAll() {
    const inBoth = this.diffs.filter((r) => r.diffType === "InBothButDiff");
    const onlyRef = this.diffs.filter((r) => r.diffType === "OnlyInReference");
    const onlyTgt = this.diffs.filter((r) => r.diffType === "OnlyInTarget");
    this.buildDiffGrid(inBoth);
    const refResult = this.buildOrphanData(onlyRef);
    this.flatRefOrphans = refResult.flat;
    this.orphanColsRef = refResult.cols;
    const tgtResult = this.buildOrphanData(onlyTgt);
    this.flatTgtOrphans = tgtResult.flat;
    this.orphanColsTgt = tgtResult.cols;
    this.refreshTabBadges();
  }
  buildDiffGrid(rows) {
    const fieldSet = /* @__PURE__ */ new Set();
    for (const row of rows) {
      for (const d of this.parseDiffs(row.diffs))
        fieldSet.add(d.field);
    }
    this.diffFields = Array.from(fieldSet);
    this.flatDiffs = rows.map((row) => {
      const flat = __spreadValues({}, row);
      const keyVals = this.extractKeyValues(row.compareItems);
      for (const [k, v] of Object.entries(keyVals)) {
        flat[`ci_${this.safeKey(k)}`] = v;
      }
      for (const d of this.parseDiffs(row.diffs)) {
        const k = this.safeKey(d.field);
        flat[`${k}_ref`] = d.ref;
        flat[`${k}_tgt`] = d.tgt;
        if (this.isNumeric(d.ref) && this.isNumeric(d.tgt))
          flat[`${k}_diff`] = this.calcDelta(d.ref, d.tgt);
      }
      return flat;
    });
    this.columnDefs = [
      ...this.buildFixedCols(true),
      ...this.diffFields.map((field) => {
        const k = this.safeKey(field);
        return {
          caption: field,
          isBand: true,
          columns: [
            { dataField: `${k}_ref`, caption: "Ref", dataType: "number", width: 100, cellTemplate: "numTpl" },
            { dataField: `${k}_tgt`, caption: "Target", dataType: "number", width: 100, cellTemplate: "numTpl" },
            { dataField: `${k}_diff`, caption: "Diff", dataType: "number", width: 100, cellTemplate: "diffValTpl" }
          ]
        };
      })
    ];
  }
  buildOrphanData(rows) {
    const flat = rows.map((row) => {
      const f = __spreadValues({}, row);
      const keyVals = this.extractKeyValues(row.compareItems);
      for (const [k, v] of Object.entries(keyVals)) {
        f[`ci_${this.safeKey(k)}`] = v;
      }
      return f;
    });
    const cols = [...this.buildFixedCols(false)];
    return { flat, cols };
  }
  /** Fixed identity columns shared by all three grids.
   *  Columns are derived from the selected run's columnSchema.
   *  includeDiffType = true only for the InBothButDiff grid. */
  buildFixedCols(includeDiffType) {
    const schema = this.currentColumnSchema;
    const schemaCols = schema.map((col) => ({
      dataField: `ci_${this.safeKey(col.name)}`,
      caption: col.name,
      width: 110,
      cellTemplate: "monoTpl"
    }));
    const cols = [
      { dataField: "id", caption: "#", width: 60, cellTemplate: "idTpl" },
      ...schemaCols,
      { dataField: "scenarioName", caption: "Scenario", minWidth: 110 },
      { dataField: "runTimestamp", caption: "Run At", width: 120, cellTemplate: "tsTpl", sortOrder: "desc" }
    ];
    if (includeDiffType) {
      cols.splice(1 + schemaCols.length, 0, {
        dataField: "diffType",
        caption: "Type",
        width: 120,
        cellTemplate: "typeTpl"
      });
    }
    return cols;
  }
  /** Returns the ColumnDef[] for the currently selected run. */
  get currentColumnSchema() {
    const run = this.runs.find((r) => r.runId === this.runId);
    return run ? parseColumnSchema(run) : [];
  }
  refreshTabBadges() {
    const run = this.runs.find((r) => r.runId === this.runId);
    this.tabs = [
      { text: "In Both (diff)", badge: String(run?.diffRowCount ?? this.flatDiffs.length) },
      { text: "Only in Reference", badge: String(run?.onlyInRefCount ?? this.flatRefOrphans.length) },
      { text: "Only in Target", badge: String(run?.onlyInTgtCount ?? this.flatTgtOrphans.length) }
    ];
  }
  // ── Context menu ──────────────────────────────────────────────────────────────
  onContextMenuPreparing(e) {
    if (!e.items)
      e.items = [];
    e.items.length = 0;
    this.activeGrid = e.component;
    if (e.target === "header") {
      e.items.push({ text: "Best Fit All Columns", icon: "columnfield", onItemClick: () => this.bestFitAllColumns() }, {
        text: "Best Fit This Column",
        icon: "columnfield",
        disabled: !e.column?.dataField,
        onItemClick: () => this.bestFitColumn(e.column)
      });
      return;
    }
    if (e.target !== "content" || e.row?.rowType !== "data")
      return;
    this.ctxColumn = e.column ?? null;
    this.ctxValue = e.column?.dataField != null ? e.row.data[e.column.dataField] : void 0;
    const label = this.formatCtxValue(this.ctxValue);
    const isNum = this.isNumericColumn(e.column);
    const hasField = !!e.column?.dataField;
    e.items.push({ text: "Best Fit All Columns", icon: "columnfield", onItemClick: () => this.bestFitAllColumns() }, { beginGroup: true }, { text: `Filter: = ${label}`, icon: "filter", disabled: !hasField, onItemClick: () => this.filterByValue("=") }, { text: `Filter: \u2260 ${label}`, icon: "filter", disabled: !hasField, onItemClick: () => this.filterByValue("<>") }, { text: "Filter by list of values\u2026", icon: "bulletlist", disabled: !hasField, onItemClick: () => this.openFilterList() }, { text: "Clear all filters", icon: "clearformat", onItemClick: () => this.activeGrid?.clearFilter() }, { beginGroup: true }, { text: "Copy unique values of this column", icon: "copy", disabled: !hasField, onItemClick: () => this.copyUniqueValues() }, { beginGroup: true }, { text: "Set decimal places\u2026", icon: "percent", disabled: !isNum || !hasField, onItemClick: () => this.openDecimalPopup() }, { beginGroup: true }, { text: "Get API query (JSON)", icon: "info", onItemClick: () => this.openApiQuery() }, { beginGroup: true }, { text: "Export to Excel (.csv)", icon: "xlsxfile", onItemClick: () => this.exportToCsv() });
  }
  // ── Context menu actions ──────────────────────────────────────────────────────
  bestFitAllColumns() {
    if (!this.activeGrid)
      return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    this.activeGrid.getVisibleColumns().filter((c) => !c.isBand && c.dataField).forEach((col) => {
      ctx.font = "700 11px sans-serif";
      let maxW = ctx.measureText(col.caption ?? col.dataField ?? "").width + 20;
      ctx.font = '11px "SF Mono","Fira Code",monospace';
      for (const row of this.activeData) {
        const w = ctx.measureText(String(row[col.dataField] ?? "")).width + 20;
        if (w > maxW)
          maxW = w;
      }
      this.activeGrid.columnOption(col.dataField, "width", Math.min(Math.ceil(maxW), 280));
    });
  }
  bestFitColumn(col) {
    if (!col?.dataField || !this.activeGrid)
      return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "700 11px sans-serif";
    let maxW = ctx.measureText(col.caption ?? col.dataField).width + 20;
    ctx.font = '11px "SF Mono","Fira Code",monospace';
    for (const row of this.activeData) {
      const w = ctx.measureText(String(row[col.dataField] ?? "")).width + 20;
      if (w > maxW)
        maxW = w;
    }
    this.activeGrid.columnOption(col.dataField, "width", Math.min(Math.ceil(maxW), 280));
  }
  filterByValue(op) {
    if (!this.ctxColumn?.dataField || !this.activeGrid)
      return;
    this.activeGrid.filter([this.ctxColumn.dataField, op, this.ctxValue]);
  }
  openFilterList() {
    if (!this.ctxColumn?.dataField)
      return;
    const field = this.ctxColumn.dataField;
    const unique = [...new Set(this.activeData.map((r) => r[field]).filter((v) => v != null))].sort((a, b) => typeof a === "number" ? a - b : String(a).localeCompare(String(b)));
    this.filterListItems = unique.map((v) => ({ label: String(v), value: v }));
    this.filterListSelectedKeys = [...unique];
    this.filterListVisible = true;
  }
  applyFilterList() {
    const field = this.ctxColumn?.dataField;
    if (!field || !this.activeGrid) {
      this.filterListVisible = false;
      return;
    }
    const keys = this.filterListSelectedKeys;
    if (keys.length === 0) {
      this.activeGrid.clearFilter();
    } else if (keys.length === 1) {
      this.activeGrid.filter([field, "=", keys[0]]);
    } else {
      const f = [];
      keys.forEach((v, i) => {
        if (i > 0)
          f.push("or");
        f.push([field, "=", v]);
      });
      this.activeGrid.filter(f);
    }
    this.filterListVisible = false;
  }
  copyUniqueValues() {
    if (!this.ctxColumn?.dataField)
      return;
    const unique = [...new Set(this.activeData.map((r) => r[this.ctxColumn.dataField]).filter((v) => v != null))].sort((a, b) => typeof a === "number" ? a - b : String(a).localeCompare(String(b)));
    navigator.clipboard.writeText(unique.join("\n")).then(() => {
      this.copyFeedback = `${unique.length} unique values copied`;
      setTimeout(() => this.copyFeedback = "", 2500);
    });
  }
  openDecimalPopup() {
    if (!this.ctxColumn?.dataField)
      return;
    this.decimalInputValue = this.decimalMap.get(this.ctxColumn.dataField) ?? 4;
    this.decimalVisible = true;
  }
  applyDecimalPlaces() {
    const field = this.ctxColumn?.dataField;
    if (!field) {
      this.decimalVisible = false;
      return;
    }
    const p = Math.max(0, Math.min(10, this.decimalInputValue));
    this.decimalMap.set(field, p);
    const touch = (cols) => cols.map((col) => {
      if (col.isBand) {
        return __spreadProps(__spreadValues({}, col), { columns: col.columns.map((s) => s.dataField === field ? __spreadProps(__spreadValues({}, s), { _d: p }) : s) });
      }
      return col.dataField === field ? __spreadProps(__spreadValues({}, col), { _d: p }) : col;
    });
    this.columnDefs = touch(this.columnDefs);
    this.orphanColsRef = touch(this.orphanColsRef);
    this.orphanColsTgt = touch(this.orphanColsTgt);
    this.decimalVisible = false;
  }
  openApiQuery() {
    const base = environment.apiBaseUrl;
    const path = this.runId ? `${base}/runs/${this.runId}/diffs` : `${base}/diffs`;
    const qp = { page: this.filter.page, pageSize: this.filter.pageSize };
    if (this.filter.diffType)
      qp["diffType"] = this.filter.diffType;
    const qs = Object.entries(qp).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
    this.apiQueryText = JSON.stringify({ method: "GET", url: `${path}?${qs}`, params: qp }, null, 2);
    this.apiQueryVisible = true;
  }
  copyApiQuery() {
    navigator.clipboard.writeText(this.apiQueryText).then(() => {
      this.copyFeedback = "Copied!";
      setTimeout(() => this.copyFeedback = "", 2e3);
    });
  }
  exportToCsv() {
    if (!this.activeGrid)
      return;
    const leafCols = this.activeGrid.getVisibleColumns().filter((c) => !c.isBand && c.dataField);
    const activeCols = this.activeColDefs;
    const rows = [];
    rows.push(leafCols.map((c) => {
      const band = activeCols.find((b) => b.isBand && b.columns?.some((s) => s.dataField === c.dataField));
      return band ? `"${band.caption}"` : '""';
    }));
    rows.push(leafCols.map((c) => `"${c.caption ?? c.dataField ?? ""}"`));
    for (const row of this.activeData) {
      rows.push(leafCols.map((c) => {
        const v = row[c.dataField];
        if (v == null)
          return "";
        if (typeof v === "string")
          return `"${v.replace(/"/g, '""')}"`;
        return String(v);
      }));
    }
    const csv = rows.map((r) => r.join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: `diff-results-run${this.runId ?? "all"}-tab${this.activeTab}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`
    }).click();
    URL.revokeObjectURL(url);
  }
  // ── Template helpers ──────────────────────────────────────────────────────────
  getNumFmt(dataField) {
    const p = dataField ? this.decimalMap.get(dataField) ?? 4 : 4;
    return `1.${p}-${p}`;
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
  parseCompareItems(raw) {
    if (!raw)
      return [];
    try {
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.length === 0)
        return [];
      const item = arr[0];
      return Object.entries(item).map(([field, value]) => ({ field, value }));
    } catch {
      return [];
    }
  }
  /** Extract flat key/value pairs from compareItems JSON (first item in array). */
  extractKeyValues(raw) {
    if (!raw)
      return {};
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) && arr.length > 0 ? arr[0] ?? {} : {};
    } catch {
      return {};
    }
  }
  isNumeric(v) {
    return typeof v === "number";
  }
  calcDelta(ref, tgt) {
    return tgt - ref;
  }
  safeKey(field) {
    return field.replace(/[^a-zA-Z0-9_]/g, "_");
  }
  get activeData() {
    switch (this.activeTab) {
      case 1:
        return this.flatRefOrphans;
      case 2:
        return this.flatTgtOrphans;
      default:
        return this.flatDiffs;
    }
  }
  get activeColDefs() {
    switch (this.activeTab) {
      case 1:
        return this.orphanColsRef;
      case 2:
        return this.orphanColsTgt;
      default:
        return this.columnDefs;
    }
  }
  isNumericColumn(col) {
    return col?.dataType === "number" || col?.dataField && /(_ref|_tgt|_diff|^ci_)/.test(col.dataField);
  }
  formatCtxValue(v) {
    if (v == null)
      return "\u2014";
    if (typeof v === "number")
      return v.toLocaleString(void 0, { maximumFractionDigits: 6 });
    return `"${String(v)}"`;
  }
  clearAllData() {
    this.diffs = [];
    this.flatDiffs = [];
    this.columnDefs = [];
    this.flatRefOrphans = [];
    this.orphanColsRef = [];
    this.flatTgtOrphans = [];
    this.orphanColsTgt = [];
    this.totalCount = 0;
    this.tabs = [
      { text: "In Both (diff)", badge: "" },
      { text: "Only in Reference", badge: "" },
      { text: "Only in Target", badge: "" }
    ];
  }
  resetFilters() {
    this.filter = { page: 1, pageSize: 1e3 };
  }
  static {
    this.\u0275fac = function DiffResultsComponent_Factory(t) {
      return new (t || _DiffResultsComponent)(\u0275\u0275directiveInject(ResultViewerService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DiffResultsComponent, selectors: [["app-diff-results"]], standalone: true, features: [\u0275\u0275ProvidersFeature([DecimalPipe]), \u0275\u0275StandaloneFeature], decls: 25, vars: 40, consts: [[1, "diff-results-page"], [1, "page-header"], [1, "subtitle"], [1, "header-right"], ["class", "copy-feedback", 4, "ngIf"], [1, "count-badge"], [1, "filter-bar", "card"], ["displayExpr", "label", "valueExpr", "runId", "placeholder", "Select an NRT Run\u2026", "width", "360", "stylingMode", "outlined", 3, "onValueChanged", "items", "value", "showClearButton", "disabled"], ["class", "empty-state card", 4, "ngIf"], ["class", "loading-center", 4, "ngIf"], [4, "ngIf"], [3, "visibleChange", "visible", "width", "height", "maxHeight", "showTitle", "showCloseButton", "dragEnabled", "title"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], ["title", "Filter by list of values", 3, "visibleChange", "visible", "width", "height", "maxHeight", "showCloseButton", "dragEnabled"], ["title", "Set decimal places", 3, "visibleChange", "visible", "width", "height", "showCloseButton", "dragEnabled"], ["class", "popup-content decimal-popup", 4, "dxTemplate", "dxTemplateOf"], ["title", "REST API Query (JSON)", 3, "visibleChange", "visible", "width", "height", "maxHeight", "showCloseButton", "dragEnabled"], [1, "copy-feedback"], [1, "empty-state", "card"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "opacity", ".35"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], [1, "loading-center"], ["height", "40", "width", "40", 3, "visible"], [1, "tabs-card", "card"], [3, "selectedIndexChange", "dataSource", "selectedIndex", "showNavButtons"], ["class", "card grid-wrap", 4, "ngIf"], [1, "card", "grid-wrap"], ["class", "tab-empty", 4, "ngIf"], ["keyExpr", "id", 3, "dataSource", "columns", "showBorders", "showColumnLines", "showRowLines", "rowAlternationEnabled", "hoverStateEnabled", "columnAutoWidth", "allowColumnResizing", "wordWrapEnabled", "cellHintEnabled", "onRowClick", "onContextMenuPreparing", 4, "ngIf"], [1, "tab-empty"], ["keyExpr", "id", 3, "onRowClick", "onContextMenuPreparing", "dataSource", "columns", "showBorders", "showColumnLines", "showRowLines", "rowAlternationEnabled", "hoverStateEnabled", "columnAutoWidth", "allowColumnResizing", "wordWrapEnabled", "cellHintEnabled"], ["mode", "standard", "showScrollbar", "always"], [3, "showInfo", "showNavigationButtons"], [3, "pageSize"], [4, "dxTemplate", "dxTemplateOf"], [1, "mono-sm"], ["class", "badge diff", 4, "ngIf"], ["class", "badge warn", 4, "ngIf"], [1, "badge", "diff"], [1, "badge", "warn"], [1, "ts"], ["class", "num-val", 4, "ngIf"], ["class", "num-empty", 4, "ngIf"], [1, "num-val"], [1, "num-empty"], [1, "diff-val"], [1, "popup-content"], ["class", "orphan-banner ref", 4, "ngIf"], ["class", "orphan-banner tgt", 4, "ngIf"], ["class", "popup-meta", 4, "ngIf"], ["class", "diff-table-wrap", 4, "ngIf"], [1, "orphan-banner", "ref"], [1, "orphan-banner", "tgt"], [1, "popup-meta"], [1, "meta-row"], ["class", "meta-item", 4, "ngFor", "ngForOf"], [1, "meta-item"], [1, "meta-l"], [1, "meta-v"], [1, "meta-v", "mono-sm"], [1, "diff-table-wrap"], [1, "section-title", 2, "margin-bottom", "10px"], [1, "diff-table"], [4, "ngFor", "ngForOf"], [1, "field-name"], [1, "ref-val"], [1, "tgt-val"], [1, "delta"], [1, "popup-hint"], ["displayExpr", "label", "keyExpr", "value", "selectionMode", "all", 3, "selectedItemKeysChange", "dataSource", "showSelectionControls", "selectedItemKeys", "height"], [1, "popup-actions"], ["text", "Apply Filter", "type", "default", "stylingMode", "contained", 3, "onClick"], ["text", "Cancel", "type", "normal", "stylingMode", "outlined", 3, "onClick"], [1, "popup-content", "decimal-popup"], ["stylingMode", "outlined", "width", "100%", 3, "valueChange", "value", "min", "max", "showSpinButtons"], ["text", "Apply", "type", "default", "stylingMode", "contained", 3, "onClick"], [1, "api-query-code"], ["text", "Copy to Clipboard", "type", "default", "stylingMode", "contained", 3, "onClick"], ["text", "Close", "type", "normal", "stylingMode", "outlined", 3, "onClick"]], template: function DiffResultsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "Diff Results");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "Browse comparison outcomes by NRT run");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3);
        \u0275\u0275template(8, DiffResultsComponent_span_8_Template, 2, 1, "span", 4);
        \u0275\u0275elementStart(9, "span", 5);
        \u0275\u0275text(10);
        \u0275\u0275pipe(11, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 6)(13, "dx-select-box", 7);
        \u0275\u0275listener("onValueChanged", function DiffResultsComponent_Template_dx_select_box_onValueChanged_13_listener($event) {
          let tmp_0_0;
          return ctx.onRunChange((tmp_0_0 = $event.value) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : null);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(14, DiffResultsComponent_div_14_Template, 6, 0, "div", 8)(15, DiffResultsComponent_div_15_Template, 2, 1, "div", 9)(16, DiffResultsComponent_ng_container_16_Template, 6, 6, "ng-container", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "dx-popup", 11);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.detailVisible, $event) || (ctx.detailVisible = $event);
          return $event;
        });
        \u0275\u0275template(18, DiffResultsComponent_div_18_Template, 2, 1, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "dx-popup", 13);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filterListVisible, $event) || (ctx.filterListVisible = $event);
          return $event;
        });
        \u0275\u0275template(20, DiffResultsComponent_div_20_Template, 10, 4, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "dx-popup", 14);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.decimalVisible, $event) || (ctx.decimalVisible = $event);
          return $event;
        });
        \u0275\u0275template(22, DiffResultsComponent_div_22_Template, 7, 4, "div", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "dx-popup", 16);
        \u0275\u0275twoWayListener("visibleChange", function DiffResultsComponent_Template_dx_popup_visibleChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.apiQueryVisible, $event) || (ctx.apiQueryVisible = $event);
          return $event;
        });
        \u0275\u0275template(24, DiffResultsComponent_div_24_Template, 8, 1, "div", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.copyFeedback);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 38, ctx.totalCount), " total");
        \u0275\u0275advance(3);
        \u0275\u0275property("items", ctx.runs)("value", ctx.runId)("showClearButton", true)("disabled", ctx.runsLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.runId && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.runId && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.detailVisible);
        \u0275\u0275property("width", 680)("height", "auto")("maxHeight", "80vh")("showTitle", true)("showCloseButton", true)("dragEnabled", true)("title", ctx.selectedDiff ? "Row #" + ctx.selectedDiff.id + " \u2014 " + ctx.selectedDiff.scenarioName : "Row Detail");
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.filterListVisible);
        \u0275\u0275property("width", 360)("height", "auto")("maxHeight", "70vh")("showCloseButton", true)("dragEnabled", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.decimalVisible);
        \u0275\u0275property("width", 300)("height", 200)("showCloseButton", true)("dragEnabled", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.apiQueryVisible);
        \u0275\u0275property("width", 580)("height", "auto")("maxHeight", "70vh")("showCloseButton", true)("dragEnabled", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      DecimalPipe,
      DatePipe,
      DxDataGridModule,
      DxDataGridComponent,
      DxoPagerComponent,
      DxoPagingComponent,
      DxoScrollingComponent,
      DxTemplateDirective,
      DxSelectBoxModule,
      DxSelectBoxComponent,
      DxTextBoxModule,
      DxButtonModule,
      DxButtonComponent,
      DxLoadIndicatorModule,
      DxLoadIndicatorComponent,
      DxPopupModule,
      DxPopupComponent,
      DxListModule,
      DxListComponent,
      DxNumberBoxModule,
      DxNumberBoxComponent,
      DxTabsModule,
      DxTabsComponent
    ], styles: ['\n\n.diff-results-page[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-top: 4px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.copy-feedback[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--pass-color);\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.filter-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 24px;\n  background: var(--card-border, rgba(255, 255, 255, 0.1));\n  flex-shrink: 0;\n}\n.count-badge[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  background: rgba(255, 255, 255, 0.06);\n  padding: 5px 12px;\n  border-radius: 20px;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 14px 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n  font-size: 14px;\n  text-align: center;\n}\n.loading-center[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px 0;\n}\n.tabs-card[_ngcontent-%COMP%] {\n  padding: 0;\n  margin-bottom: 0;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom: none;\n}\n.tabs-card[_ngcontent-%COMP%]     .dx-tabs {\n  background: transparent;\n  border: none;\n}\n.tabs-card[_ngcontent-%COMP%]     .dx-tab {\n  font-size: 12px;\n  font-weight: 600;\n  padding: 10px 18px;\n  letter-spacing: 0.2px;\n}\n.tabs-card[_ngcontent-%COMP%]     .dx-tab-selected {\n  color: var(--accent-color, #4f8ef7);\n  border-bottom: 2px solid var(--accent-color, #4f8ef7);\n}\n.tabs-card[_ngcontent-%COMP%]     .dx-badge {\n  font-size: 10px;\n  padding: 1px 6px;\n  margin-left: 6px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.12);\n  color: var(--text-secondary);\n}\n.tab-empty[_ngcontent-%COMP%] {\n  padding: 40px 20px;\n  text-align: center;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.grid-wrap[_ngcontent-%COMP%]     .dx-datagrid-rowsview .dx-row > td {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 6px !important;\n  padding-right: 6px !important;\n  height: 23px !important;\n  line-height: 23px !important;\n  font-size: 11px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.grid-wrap[_ngcontent-%COMP%]     .dx-datagrid-headers .dx-row > td {\n  padding-top: 3px !important;\n  padding-bottom: 3px !important;\n  padding-left: 6px !important;\n  padding-right: 6px !important;\n  font-size: 11px;\n  line-height: 16px;\n}\n.grid-wrap[_ngcontent-%COMP%]     .dx-datagrid-rowsview .dx-template-wrapper {\n  padding: 0 !important;\n  height: 23px;\n  display: flex;\n  align-items: center;\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 11px;\n}\n.ts[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.num-val[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 11px;\n  color: var(--text-primary);\n  display: block;\n  text-align: right;\n  line-height: 23px;\n}\n.num-empty[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  opacity: 0.35;\n  font-size: 11px;\n  display: block;\n  text-align: center;\n  line-height: 23px;\n}\n.diff-val[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 11px;\n  font-weight: 600;\n  display: block;\n  text-align: right;\n  line-height: 23px;\n}\n.diff-val.pos[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n}\n.diff-val.neg[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n}\n.diff-val.zero[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n}\n.orphan-banner[_ngcontent-%COMP%] {\n  border-radius: 6px;\n  padding: 10px 14px;\n  font-size: 12px;\n  margin-bottom: 14px;\n}\n.orphan-banner.ref[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.1);\n  border-left: 3px solid rgba(79, 142, 247, 0.6);\n  color: var(--text-primary);\n}\n.orphan-banner.tgt[_ngcontent-%COMP%] {\n  background: rgba(255, 165, 0, 0.1);\n  border-left: 3px solid rgba(255, 165, 0, 0.6);\n  color: var(--text-primary);\n}\n.popup-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin: 0 0 12px;\n}\n.popup-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-top: 14px;\n}\n.decimal-popup[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.api-query-code[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.25);\n  border: 1px solid var(--card-border);\n  border-radius: 6px;\n  padding: 12px 14px;\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 11px;\n  color: var(--text-primary);\n  white-space: pre-wrap;\n  word-break: break-all;\n  margin: 0;\n  max-height: 300px;\n  overflow-y: auto;\n}\n.popup-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.meta-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n.meta-l[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.meta-v[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.diff-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.diff-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--card-border);\n}\n.diff-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid var(--card-border);\n  font-size: 13px;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.diff-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02);\n}\n.field-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-family: monospace;\n}\n.ref-val[_ngcontent-%COMP%] {\n  color: var(--fail-color);\n  font-family: monospace;\n}\n.tgt-val[_ngcontent-%COMP%] {\n  color: var(--pass-color);\n  font-family: monospace;\n}\n.delta[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-family: monospace;\n  font-size: 12px;\n}\n.no-diffs[_ngcontent-%COMP%] {\n  padding: 20px;\n  text-align: center;\n  color: var(--text-secondary);\n  font-size: 13px;\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: 8px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n}\n/*# sourceMappingURL=diff-results.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DiffResultsComponent, { className: "DiffResultsComponent", filePath: "src\\app\\pages\\diff-results\\diff-results.component.ts", lineNumber: 39 });
})();
export {
  DiffResultsComponent
};
//# sourceMappingURL=chunk-JRBYDR5K.js.map
