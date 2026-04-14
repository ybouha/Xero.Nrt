import {
  NrtApiService
} from "./chunk-KB43M2JB.js";
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxPopupComponent,
  DxPopupModule,
  DxTemplateDirective,
  DxTextBoxComponent,
  DxTextBoxModule,
  DxiColumnComponent,
  DxoFilterRowComponent,
  DxoPagerComponent,
  DxoPagingComponent
} from "./chunk-VGKFB52G.js";
import {
  CommonModule,
  DatePipe,
  NgIf,
  Router,
  RouterLink,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WGIWJJBP.js";

// src/app/pages/run-definitions/run-definitions.component.ts
function RunDefinitionsComponent_dx_load_indicator_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("visible", ctx_r0.loading);
  }
}
function RunDefinitionsComponent_div_11_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 26)(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 28);
    \u0275\u0275element(5, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r2.data.referenceVersion);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(d_r2.data.targetVersion);
  }
}
function RunDefinitionsComponent_div_11_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, d_r3.value, "MMM d, yyyy"));
  }
}
function RunDefinitionsComponent_div_11_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 32)(2, "button", 33);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_11_div_14_Template_button_click_2_listener($event) {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openExecute(d_r5.data, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 34);
    \u0275\u0275element(4, "polygon", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Execute ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 36);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_11_div_14_Template_button_click_6_listener($event) {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.editDefinition(d_r5.data, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 37);
    \u0275\u0275element(8, "path", 38)(9, "path", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "button", 40);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_11_div_14_Template_button_click_11_listener($event) {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openDelete(d_r5.data, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 37);
    \u0275\u0275element(13, "polyline", 41)(14, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Delete ");
    \u0275\u0275elementEnd()()();
  }
}
function RunDefinitionsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "dx-data-grid", 14);
    \u0275\u0275element(2, "dxo-paging", 15)(3, "dxo-pager", 16)(4, "dxo-filter-row", 17)(5, "dxi-column", 18)(6, "dxi-column", 19)(7, "dxi-column", 20)(8, "dxi-column", 21)(9, "dxi-column", 22);
    \u0275\u0275template(10, RunDefinitionsComponent_div_11_div_10_Template, 8, 2, "div", 23);
    \u0275\u0275element(11, "dxi-column", 24);
    \u0275\u0275template(12, RunDefinitionsComponent_div_11_div_12_Template, 4, 4, "div", 23);
    \u0275\u0275element(13, "dxi-column", 25);
    \u0275\u0275template(14, RunDefinitionsComponent_div_11_div_14_Template, 16, 0, "div", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r0.definitions)("showBorders", false)("showColumnLines", false)("rowAlternationEnabled", false)("hoverStateEnabled", true);
    \u0275\u0275advance();
    \u0275\u0275property("pageSize", 20);
    \u0275\u0275advance();
    \u0275\u0275property("showInfo", true);
    \u0275\u0275advance();
    \u0275\u0275property("visible", true);
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 160);
    \u0275\u0275advance();
    \u0275\u0275property("width", 120);
    \u0275\u0275advance();
    \u0275\u0275property("minWidth", 200);
    \u0275\u0275advance();
    \u0275\u0275property("width", 140);
    \u0275\u0275advance();
    \u0275\u0275property("width", 200)("allowFiltering", false);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "versionTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 140);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "tsTpl");
    \u0275\u0275advance();
    \u0275\u0275property("width", 220)("allowSorting", false)("allowFiltering", false);
    \u0275\u0275advance();
    \u0275\u0275property("dxTemplateOf", "actionsTpl");
  }
}
function RunDefinitionsComponent_div_13_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2, "Ref:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.refCommandLine);
  }
}
function RunDefinitionsComponent_div_13_div_3_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2, "Tgt:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.targetCommandLine);
  }
}
function RunDefinitionsComponent_div_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55);
    \u0275\u0275text(2, "PRE-EXECUTION COMMANDS");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, RunDefinitionsComponent_div_13_div_3_div_3_Template, 5, 1, "div", 56)(4, RunDefinitionsComponent_div_13_div_3_div_4_Template, 5, 1, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.refCommandLine);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.targetCommandLine);
  }
}
function RunDefinitionsComponent_div_13_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.executeError);
  }
}
function RunDefinitionsComponent_div_13_dx_load_indicator_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 61);
  }
}
function RunDefinitionsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "p", 44);
    \u0275\u0275text(2, " This will create a new run execution using the saved configuration. Provide the valuation date below. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, RunDefinitionsComponent_div_13_div_3_Template, 5, 2, "div", 45);
    \u0275\u0275elementStart(4, "div", 46)(5, "label", 47);
    \u0275\u0275text(6, "Valuation Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dx-text-box", 48);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionsComponent_div_13_Template_dx_text_box_valueChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.valuationDate, $event) || (ctx_r0.valuationDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, RunDefinitionsComponent_div_13_div_8_Template, 2, 1, "div", 49);
    \u0275\u0275elementStart(9, "div", 50)(10, "button", 51);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_13_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.executeVisible = false);
    });
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 52);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_13_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmExecute());
    });
    \u0275\u0275template(13, RunDefinitionsComponent_div_13_dx_load_indicator_13_Template, 1, 0, "dx-load-indicator", 53);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", (ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.refCommandLine) || (ctx_r0.executeTarget == null ? null : ctx_r0.executeTarget.targetCommandLine));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.valuationDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.executeError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.executing || !ctx_r0.valuationDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.executing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.executing ? "Running\u2026" : "Execute", " ");
  }
}
function RunDefinitionsComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "p", 44);
    \u0275\u0275text(2, " Delete definition ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? Existing executions that used this definition will not be affected. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 50)(7, "button", 51);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.deleteVisible = false);
    });
    \u0275\u0275text(8, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 62);
    \u0275\u0275listener("click", function RunDefinitionsComponent_div_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmDelete());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.deleteTarget == null ? null : ctx_r0.deleteTarget.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.deleting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.deleting ? "Deleting\u2026" : "Delete", " ");
  }
}
var RunDefinitionsComponent = class _RunDefinitionsComponent {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.loading = true;
    this.definitions = [];
    this.executeVisible = false;
    this.executeTarget = null;
    this.valuationDate = "";
    this.executing = false;
    this.executeError = "";
    this.deleteVisible = false;
    this.deleteTarget = null;
    this.deleting = false;
  }
  ngOnInit() {
    this.loadDefinitions();
  }
  loadDefinitions() {
    this.loading = true;
    this.api.getDefinitions().subscribe({
      next: (defs) => {
        this.definitions = defs;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  openExecute(def, event) {
    event.stopPropagation();
    this.executeTarget = def;
    this.valuationDate = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
    this.executeError = "";
    this.executing = false;
    this.executeVisible = true;
  }
  confirmExecute() {
    if (!this.executeTarget || !this.valuationDate)
      return;
    this.executing = true;
    this.executeError = "";
    const req = { valuationDate: this.valuationDate };
    this.api.executeFromDefinition(this.executeTarget.definitionId, req).subscribe({
      next: (result) => {
        this.executeVisible = false;
        this.router.navigate(["/run-executions"]);
      },
      error: (err) => {
        this.executeError = err?.error?.detail ?? err?.message ?? "Execution failed.";
        this.executing = false;
      }
    });
  }
  openDelete(def, event) {
    event.stopPropagation();
    this.deleteTarget = def;
    this.deleting = false;
    this.deleteVisible = true;
  }
  confirmDelete() {
    if (!this.deleteTarget)
      return;
    this.deleting = true;
    this.api.deleteDefinition(this.deleteTarget.definitionId).subscribe({
      next: () => {
        this.deleteVisible = false;
        this.loadDefinitions();
      },
      error: () => {
        this.deleting = false;
      }
    });
  }
  editDefinition(def, event) {
    event.stopPropagation();
    this.router.navigate(["/run-definitions", def.definitionId, "edit"]);
  }
  static {
    this.\u0275fac = function RunDefinitionsComponent_Factory(t) {
      return new (t || _RunDefinitionsComponent)(\u0275\u0275directiveInject(NrtApiService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RunDefinitionsComponent, selectors: [["app-run-definitions"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 17, consts: [[1, "run-definitions-page"], [1, "page-header"], [1, "actions"], ["routerLink", "/run-definitions/new", 1, "btn", "btn-primary"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["height", "36", "width", "36", "class", "grid-loader", 3, "visible", 4, "ngIf"], ["class", "grid-wrap card", 4, "ngIf"], [3, "visibleChange", "visible", "width", "height", "showTitle", "title", "dragEnabled", "showCloseButton"], ["class", "popup-content", 4, "dxTemplate", "dxTemplateOf"], ["title", "Confirm Delete", 3, "visibleChange", "visible", "width", "height", "showTitle", "dragEnabled", "showCloseButton"], ["height", "36", "width", "36", 1, "grid-loader", 3, "visible"], [1, "grid-wrap", "card"], ["keyExpr", "definitionId", 3, "dataSource", "showBorders", "showColumnLines", "rowAlternationEnabled", "hoverStateEnabled"], [3, "pageSize"], [3, "showInfo"], [3, "visible"], ["dataField", "name", "caption", "Name", 3, "minWidth"], ["dataField", "scope", "caption", "Scope", 3, "width"], ["dataField", "description", "caption", "Description", 3, "minWidth"], ["dataField", "scenarioName", "caption", "Scenario", 3, "width"], ["caption", "Ref \u2192 Target", "cellTemplate", "versionTpl", 3, "width", "allowFiltering"], [4, "dxTemplate", "dxTemplateOf"], ["dataField", "updatedAt", "caption", "Updated", "cellTemplate", "tsTpl", "sortOrder", "desc", 3, "width"], ["caption", "", "cellTemplate", "actionsTpl", 3, "width", "allowSorting", "allowFiltering"], [1, "version-pair"], [1, "ver", "ref"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M5 12h14M12 5l7 7-7 7"], [1, "ver", "tgt"], [1, "mono-sm", "ts"], [1, "row-actions"], [1, "btn-action", "run", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "currentColor"], ["points", "5 3 19 12 5 21 5 3"], [1, "btn-action", "edit", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "btn-action", "delete", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"], [1, "popup-content"], [1, "popup-desc"], ["class", "cmd-preview", 4, "ngIf"], [1, "field-group"], [1, "field-label"], ["placeholder", "yyyy-MM-dd", "stylingMode", "outlined", 3, "valueChange", "value"], ["class", "error-msg", 4, "ngIf"], [1, "popup-footer"], [1, "btn", "btn-ghost", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["height", "16", "width", "16", 4, "ngIf"], [1, "cmd-preview"], [1, "cmd-title"], ["class", "cmd-row", 4, "ngIf"], [1, "cmd-row"], [1, "cmd-label"], [1, "cmd-code"], [1, "error-msg"], ["height", "16", "width", "16"], [1, "btn", "btn-danger", 3, "click", "disabled"]], template: function RunDefinitionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Run Definitions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "a", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 4);
        \u0275\u0275element(7, "line", 5)(8, "line", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275text(9, " New Definition ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(10, RunDefinitionsComponent_dx_load_indicator_10_Template, 1, 1, "dx-load-indicator", 7)(11, RunDefinitionsComponent_div_11_Template, 15, 21, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "dx-popup", 9);
        \u0275\u0275twoWayListener("visibleChange", function RunDefinitionsComponent_Template_dx_popup_visibleChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.executeVisible, $event) || (ctx.executeVisible = $event);
          return $event;
        });
        \u0275\u0275template(13, RunDefinitionsComponent_div_13_Template, 15, 6, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "dx-popup", 11);
        \u0275\u0275twoWayListener("visibleChange", function RunDefinitionsComponent_Template_dx_popup_visibleChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.deleteVisible, $event) || (ctx.deleteVisible = $event);
          return $event;
        });
        \u0275\u0275template(15, RunDefinitionsComponent_div_15_Template, 11, 3, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_6_0;
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.executeVisible);
        \u0275\u0275property("width", 460)("height", "auto")("showTitle", true)("title", "Execute: " + ((tmp_6_0 = ctx.executeTarget == null ? null : ctx.executeTarget.name) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : ""))("dragEnabled", true)("showCloseButton", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("visible", ctx.deleteVisible);
        \u0275\u0275property("width", 380)("height", "auto")("showTitle", true)("dragEnabled", false)("showCloseButton", true);
        \u0275\u0275advance();
        \u0275\u0275property("dxTemplateOf", "content");
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      DatePipe,
      RouterLink,
      DxDataGridModule,
      DxDataGridComponent,
      DxiColumnComponent,
      DxoFilterRowComponent,
      DxoPagerComponent,
      DxoPagingComponent,
      DxTemplateDirective,
      DxPopupModule,
      DxPopupComponent,
      DxButtonModule,
      DxTextBoxModule,
      DxTextBoxComponent,
      DxLoadIndicatorModule,
      DxLoadIndicatorComponent
    ], styles: ['\n\n.run-definitions-page[_ngcontent-%COMP%] {\n  max-width: 1300px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--card-border);\n  color: var(--text-primary);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: rgba(246, 109, 109, 0.15);\n  color: var(--fail-color, #f66d6d);\n  border: 1px solid rgba(246, 109, 109, 0.3);\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: rgba(246, 109, 109, 0.25);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.grid-loader[_ngcontent-%COMP%] {\n  display: block;\n  margin: 60px auto;\n}\n.grid-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.version-pair[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n}\n.version-pair[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  flex-shrink: 0;\n}\n.ver[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  padding: 2px 6px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.ver.ref[_ngcontent-%COMP%] {\n  background: rgba(79, 142, 247, 0.12);\n  color: var(--accent);\n}\n.ver.tgt[_ngcontent-%COMP%] {\n  background: rgba(62, 207, 142, 0.12);\n  color: var(--pass-color);\n}\n.mono-sm[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 12px;\n}\n.ts[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.btn-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 9px;\n  font-size: 11px;\n  font-weight: 600;\n  border-radius: 5px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition: background 0.15s, border-color 0.15s;\n}\n.btn-action.run[_ngcontent-%COMP%] {\n  color: var(--pass-color, #3ecf8e);\n  background: rgba(62, 207, 142, 0.1);\n  border-color: rgba(62, 207, 142, 0.25);\n}\n.btn-action.run[_ngcontent-%COMP%]:hover {\n  background: rgba(62, 207, 142, 0.2);\n}\n.btn-action.edit[_ngcontent-%COMP%] {\n  color: var(--accent, #4f8ef7);\n  background: rgba(79, 142, 247, 0.1);\n  border-color: rgba(79, 142, 247, 0.25);\n}\n.btn-action.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(79, 142, 247, 0.2);\n}\n.btn-action.delete[_ngcontent-%COMP%] {\n  color: var(--fail-color, #f66d6d);\n  background: rgba(246, 109, 109, 0.08);\n  border-color: rgba(246, 109, 109, 0.2);\n}\n.btn-action.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(246, 109, 109, 0.18);\n}\n.popup-content[_ngcontent-%COMP%] {\n  padding: 16px 20px 20px;\n}\n.popup-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n  line-height: 1.5;\n}\n.popup-desc[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.cmd-preview[_ngcontent-%COMP%] {\n  background: var(--content-bg);\n  border-radius: 8px;\n  padding: 12px 14px;\n  margin-bottom: 16px;\n}\n.cmd-title[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.6px;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.cmd-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n.cmd-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.cmd-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  width: 28px;\n  flex-shrink: 0;\n  padding-top: 2px;\n}\n.cmd-code[_ngcontent-%COMP%] {\n  font-family:\n    "SF Mono",\n    "Fira Code",\n    monospace;\n  font-size: 11px;\n  color: var(--text-primary);\n  word-break: break-all;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.error-msg[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fail-color, #f66d6d);\n  background: rgba(246, 109, 109, 0.08);\n  border-radius: 6px;\n  padding: 8px 10px;\n  margin-bottom: 12px;\n}\n.popup-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n/*# sourceMappingURL=run-definitions.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RunDefinitionsComponent, { className: "RunDefinitionsComponent", filePath: "src\\app\\pages\\run-definitions\\run-definitions.component.ts", lineNumber: 29 });
})();
export {
  RunDefinitionsComponent
};
//# sourceMappingURL=chunk-2MMOLOPN.js.map
