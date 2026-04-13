import {
  DxButtonComponent,
  DxButtonModule,
  DxFormComponent,
  DxFormModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxTagBoxComponent,
  DxTagBoxModule,
  DxTemplateDirective,
  DxTextAreaComponent,
  DxTextAreaModule,
  DxiItemComponent,
  environment
} from "./chunk-QHX6XEZF.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  HttpParams,
  NgIf,
  Router,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-MKDRXMS5.js";

// src/app/core/services/nrt-api.service.ts
var NrtApiService = class _NrtApiService {
  constructor(http) {
    this.http = http;
    this.base = environment.apiBaseUrl;
  }
  executeRun(request) {
    return this.http.post(`${this.base}/nrt/runs`, request);
  }
  getRuns(page = 1, pageSize = 20) {
    const params = new HttpParams().set("page", page).set("pageSize", pageSize);
    return this.http.get(`${this.base}/runs`, { params });
  }
  getRun(runId) {
    return this.http.get(`${this.base}/runs/${runId}`);
  }
  static {
    this.\u0275fac = function NrtApiService_Factory(t) {
      return new (t || _NrtApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NrtApiService, factory: _NrtApiService.\u0275fac, providedIn: "root" });
  }
};

// src/app/pages/new-run/new-run.component.ts
var _c0 = () => ({ type: "date", displayFormat: "yyyy-MM-dd" });
var _c1 = (a0) => ({ items: a0 });
function NewRunComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "dx-text-area", 30);
    \u0275\u0275twoWayListener("valueChange", function NewRunComponent_div_27_Template_dx_text_area_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.reference.query, $event) || (ctx_r1.formData.reference.query = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("value", ctx_r1.formData.reference.query);
    \u0275\u0275property("height", 100);
  }
}
function NewRunComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "dx-text-area", 30);
    \u0275\u0275twoWayListener("valueChange", function NewRunComponent_div_37_Template_dx_text_area_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.target.query, $event) || (ctx_r1.formData.target.query = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("value", ctx_r1.formData.target.query);
    \u0275\u0275property("height", 100);
  }
}
function NewRunComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "dx-tag-box", 31);
    \u0275\u0275twoWayListener("valueChange", function NewRunComponent_div_43_Template_dx_tag_box_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.compare.keyProperties, $event) || (ctx_r1.formData.compare.keyProperties = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("value", ctx_r1.formData.compare.keyProperties);
    \u0275\u0275property("acceptCustomValue", true);
  }
}
function NewRunComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "dx-tag-box", 32);
    \u0275\u0275twoWayListener("valueChange", function NewRunComponent_div_45_Template_dx_tag_box_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.compare.compareProperties, $event) || (ctx_r1.formData.compare.compareProperties = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("value", ctx_r1.formData.compare.compareProperties);
    \u0275\u0275property("acceptCustomValue", true);
  }
}
function NewRunComponent_dx_load_indicator_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 33);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("visible", ctx_r1.submitting);
  }
}
function NewRunComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 36);
    \u0275\u0275element(3, "circle", 37)(4, "path", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 39);
    \u0275\u0275text(6, "Ready to Run");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 40);
    \u0275\u0275text(8, "Configure the settings on the left and click ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "Execute NRT Run");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " to start.");
    \u0275\u0275elementEnd()();
  }
}
function NewRunComponent_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "dx-load-indicator", 42);
    \u0275\u0275elementStart(2, "div", 39);
    \u0275\u0275text(3, "Running NRT\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 40);
    \u0275\u0275text(5, "Loading data, comparing, saving diffs. This may take a minute.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("visible", true);
  }
}
function NewRunComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275text(2, "\u2715");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45);
    \u0275\u0275text(4, "Run Failed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function NewRunComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48)(2, "span", 49);
    \u0275\u0275element(3, "span", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 52);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 53)(11, "div", 54)(12, "span");
    \u0275\u0275text(13, "Ref Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 54)(18, "span");
    \u0275\u0275text(19, "Tgt Rows");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 54)(24, "span");
    \u0275\u0275text(25, "Diffs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 54)(30, "span");
    \u0275\u0275text(31, "Only in Ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "strong");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 54)(36, "span");
    \u0275\u0275text(37, "Only in Tgt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "strong");
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "dx-button", 55);
    \u0275\u0275listener("onClick", function NewRunComponent_div_62_Template_dx_button_onClick_41_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToRuns());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_10_0;
    let tmp_12_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pass", ctx_r1.result.passed)("fail", !ctx_r1.result.passed);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.result.passed ? "PASS" : "FAIL", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Run #", ctx_r1.result.runId, " Complete ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 18, ctx_r1.result.durationSeconds, "1.1-1"), "s total");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 21, ctx_r1.result.refRowCount));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 23, ctx_r1.result.tgtRowCount));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("fail-text", ((tmp_8_0 = ctx_r1.result == null ? null : ctx_r1.result.diffRowCount) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 25, ctx_r1.result == null ? null : ctx_r1.result.diffRowCount));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("warn-text", ((tmp_10_0 = ctx_r1.result == null ? null : ctx_r1.result.onlyInRefCount) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 27, ctx_r1.result == null ? null : ctx_r1.result.onlyInRefCount));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("warn-text", ((tmp_12_0 = ctx_r1.result == null ? null : ctx_r1.result.onlyInTgtCount) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : 0) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 29, ctx_r1.result == null ? null : ctx_r1.result.onlyInTgtCount));
  }
}
var NewRunComponent = class _NewRunComponent {
  constructor(nrtApi, router) {
    this.nrtApi = nrtApi;
    this.router = router;
    this.submitting = false;
    this.result = null;
    this.error = null;
    this.providerOptions = ["PostgreSql", "SqlServer"];
    this.defaultConnStr = "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y";
    this.defaultRefQuery = `SELECT trade_id AS "TradeId", book AS "Book", desk AS "Desk",
  risk_factor AS "RiskFactor", asset_class AS "AssetClass",
  valuation_date::text AS "ValuationDate",
  delta AS "Delta", gamma AS "Gamma", vega AS "Vega",
  var_1d_99 AS "Var1D99", svar_1d_99 AS "SVaR1D99", pnl AS "Pnl"
FROM nrt_reference_data
WHERE valuation_date::text = @ValuationDate
ORDER BY trade_id`;
    this.defaultTgtQuery = `SELECT trade_id AS "TradeId", book AS "Book", desk AS "Desk",
  risk_factor AS "RiskFactor", asset_class AS "AssetClass",
  valuation_date::text AS "ValuationDate",
  delta AS "Delta", gamma AS "Gamma", vega AS "Vega",
  var_1d_99 AS "Var1D99", svar_1d_99 AS "SVaR1D99", pnl AS "Pnl"
FROM nrt_target_data
WHERE valuation_date::text = @ValuationDate
ORDER BY trade_id`;
    this.formData = {
      scenarioName: "VaR NRT",
      referenceVersion: "prod-2025-01",
      targetVersion: "uat-2025-02",
      valuationDate: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
      reference: {
        provider: "PostgreSql",
        connectionString: this.defaultConnStr,
        query: this.defaultRefQuery,
        timeoutSeconds: 300
      },
      target: {
        provider: "PostgreSql",
        connectionString: this.defaultConnStr,
        query: this.defaultTgtQuery,
        timeoutSeconds: 300
      },
      compare: {
        keyProperties: ["TradeId", "Book", "Desk", "RiskFactor", "ValuationDate"],
        compareProperties: []
      },
      output: {
        diffDb: {
          enabled: true,
          provider: "PostgreSql",
          connectionString: this.defaultConnStr,
          tableName: "NrtDiffResults"
        }
      }
    };
  }
  submitRun() {
    this.submitting = true;
    this.result = null;
    this.error = null;
    this.nrtApi.executeRun(this.formData).subscribe({
      next: (res) => {
        this.result = res;
        this.submitting = false;
      },
      error: (err) => {
        this.error = err?.error?.title ?? err?.message ?? "Run failed. Check API logs.";
        this.submitting = false;
      }
    });
  }
  goToRuns() {
    this.router.navigate(["/nrt-runs"]);
  }
  static {
    this.\u0275fac = function NewRunComponent_Factory(t) {
      return new (t || _NewRunComponent)(\u0275\u0275directiveInject(NrtApiService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewRunComponent, selectors: [["app-new-run"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 63, vars: 31, consts: [[1, "new-run-page"], [1, "page-header"], [1, "subtitle"], [1, "run-layout"], [1, "form-pane"], [1, "card", "form-section"], [1, "section-title"], ["labelMode", "outside", 3, "formData", "showColonAfterLabel"], ["itemType", "group", 3, "colCount"], ["dataField", "scenarioName", "label.text", "Scenario Name", "editorType", "dxTextBox"], ["dataField", "referenceVersion", "label.text", "Reference Version", "editorType", "dxTextBox"], ["dataField", "targetVersion", "label.text", "Target Version", "editorType", "dxTextBox"], ["dataField", "valuationDate", "label.text", "Valuation Date", "editorType", "dxDateBox", 3, "editorOptions"], ["dataField", "provider", "label.text", "Provider", "editorType", "dxSelectBox", 3, "editorOptions"], ["dataField", "timeoutSeconds", "label.text", "Timeout (sec)", "editorType", "dxNumberBox"], ["dataField", "connectionString", "label.text", "Connection String", "editorType", "dxTextBox"], ["label.text", "SQL Query"], [4, "dxTemplate"], ["label.text", "Key Properties"], ["label.text", "Compare Properties (empty = all non-key)"], ["dataField", "enabled", "label.text", "Enabled", "editorType", "dxCheckBox"], ["dataField", "tableName", "label.text", "Table Name", "editorType", "dxTextBox"], [1, "submit-row"], ["text", "Execute NRT Run", "type", "default", "stylingMode", "contained", 3, "onClick", "disabled"], ["height", "24", "width", "24", 3, "visible", 4, "ngIf"], [1, "result-pane"], ["class", "idle-panel card", 4, "ngIf"], ["class", "running-panel card", 4, "ngIf"], ["class", "error-panel card", 4, "ngIf"], ["class", "success-panel card", 4, "ngIf"], ["stylingMode", "outlined", 3, "valueChange", "value", "height"], ["stylingMode", "outlined", "placeholder", "e.g. TradeId, Book\u2026", 3, "valueChange", "value", "acceptCustomValue"], ["stylingMode", "outlined", "placeholder", "Leave empty to compare all", 3, "valueChange", "value", "acceptCustomValue"], ["height", "24", "width", "24", 3, "visible"], [1, "idle-panel", "card"], [1, "idle-icon"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M12 6v6l4 2"], [1, "idle-title"], [1, "idle-sub"], [1, "running-panel", "card"], ["height", "50", "width", "50", 3, "visible"], [1, "error-panel", "card"], [1, "error-icon"], [1, "idle-title", 2, "color", "var(--fail-color)"], [1, "error-msg"], [1, "success-panel", "card"], [1, "result-status"], [1, "badge"], [1, "dot"], [1, "result-headline"], [1, "result-sub"], [1, "result-counters"], [1, "res-row"], ["text", "View Runs", "type", "default", "stylingMode", "contained", "width", "100%", 3, "onClick"]], template: function NewRunComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275text(4, "New NRT Run");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 2);
        \u0275\u0275text(6, "Configure and execute a comparison run");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 3)(8, "div", 4)(9, "div", 5)(10, "div", 6);
        \u0275\u0275text(11, "General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "dx-form", 7)(13, "dxi-item", 8);
        \u0275\u0275element(14, "dxi-item", 9)(15, "dxi-item", 10)(16, "dxi-item", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "dxi-item", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 5)(19, "div", 6);
        \u0275\u0275text(20, "Reference Database");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "dx-form", 7)(22, "dxi-item", 8);
        \u0275\u0275element(23, "dxi-item", 13)(24, "dxi-item", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "dxi-item", 15);
        \u0275\u0275elementStart(26, "dxi-item", 16);
        \u0275\u0275template(27, NewRunComponent_div_27_Template, 2, 2, "div", 17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 5)(29, "div", 6);
        \u0275\u0275text(30, "Target Database");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "dx-form", 7)(32, "dxi-item", 8);
        \u0275\u0275element(33, "dxi-item", 13)(34, "dxi-item", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "dxi-item", 15);
        \u0275\u0275elementStart(36, "dxi-item", 16);
        \u0275\u0275template(37, NewRunComponent_div_37_Template, 2, 2, "div", 17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "div", 5)(39, "div", 6);
        \u0275\u0275text(40, "Compare Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "dx-form", 7)(42, "dxi-item", 18);
        \u0275\u0275template(43, NewRunComponent_div_43_Template, 2, 2, "div", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "dxi-item", 19);
        \u0275\u0275template(45, NewRunComponent_div_45_Template, 2, 2, "div", 17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(46, "div", 5)(47, "div", 6);
        \u0275\u0275text(48, "Diff Output (Database)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "dx-form", 7)(50, "dxi-item", 8);
        \u0275\u0275element(51, "dxi-item", 20)(52, "dxi-item", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275element(53, "dxi-item", 15)(54, "dxi-item", 21);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(55, "div", 22)(56, "dx-button", 23);
        \u0275\u0275listener("onClick", function NewRunComponent_Template_dx_button_onClick_56_listener() {
          return ctx.submitRun();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(57, NewRunComponent_dx_load_indicator_57_Template, 1, 1, "dx-load-indicator", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "aside", 25);
        \u0275\u0275template(59, NewRunComponent_div_59_Template, 12, 0, "div", 26)(60, NewRunComponent_div_60_Template, 6, 1, "div", 27)(61, NewRunComponent_div_61_Template, 7, 1, "div", 28)(62, NewRunComponent_div_62_Template, 42, 31, "div", 29);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("formData", ctx.formData)("showColonAfterLabel", false);
        \u0275\u0275advance();
        \u0275\u0275property("colCount", 3);
        \u0275\u0275advance(4);
        \u0275\u0275property("editorOptions", \u0275\u0275pureFunction0(24, _c0));
        \u0275\u0275advance(4);
        \u0275\u0275property("formData", ctx.formData.reference)("showColonAfterLabel", false);
        \u0275\u0275advance();
        \u0275\u0275property("colCount", 2);
        \u0275\u0275advance();
        \u0275\u0275property("editorOptions", \u0275\u0275pureFunction1(25, _c1, ctx.providerOptions));
        \u0275\u0275advance(8);
        \u0275\u0275property("formData", ctx.formData.target)("showColonAfterLabel", false);
        \u0275\u0275advance();
        \u0275\u0275property("colCount", 2);
        \u0275\u0275advance();
        \u0275\u0275property("editorOptions", \u0275\u0275pureFunction1(27, _c1, ctx.providerOptions));
        \u0275\u0275advance(8);
        \u0275\u0275property("formData", ctx.formData.compare)("showColonAfterLabel", false);
        \u0275\u0275advance(8);
        \u0275\u0275property("formData", ctx.formData.output.diffDb)("showColonAfterLabel", false);
        \u0275\u0275advance();
        \u0275\u0275property("colCount", 2);
        \u0275\u0275advance(2);
        \u0275\u0275property("editorOptions", \u0275\u0275pureFunction1(29, _c1, ctx.providerOptions));
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitting);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.result && !ctx.error && !ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.result);
      }
    }, dependencies: [CommonModule, NgIf, DecimalPipe, DxFormModule, DxFormComponent, DxiItemComponent, DxTemplateDirective, DxButtonModule, DxButtonComponent, DxLoadIndicatorModule, DxLoadIndicatorComponent, DxTextAreaModule, DxTextAreaComponent, DxTagBoxModule, DxTagBoxComponent], styles: ["\n\n.new-run-page[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-top: 4px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.run-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 300px;\n  gap: 20px;\n  align-items: start;\n}\n.form-pane[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.6px;\n  margin-bottom: 14px;\n}\n.submit-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 4px 0;\n}\n.result-pane[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n}\n.idle-panel[_ngcontent-%COMP%], .running-panel[_ngcontent-%COMP%], .error-panel[_ngcontent-%COMP%], .success-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 32px 24px;\n  gap: 10px;\n}\n.idle-icon[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n}\n.idle-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.idle-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.error-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: rgba(246, 109, 109, 0.15);\n  color: var(--fail-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: 700;\n}\n.error-msg[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--fail-color);\n  word-break: break-word;\n}\n.result-status[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.result-status[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 14px;\n  padding: 5px 14px;\n}\n.result-headline[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.result-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.result-counters[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin: 8px 0 16px;\n}\n.res-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n}\n.res-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.res-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.fail-text[_ngcontent-%COMP%] {\n  color: var(--fail-color) !important;\n}\n.warn-text[_ngcontent-%COMP%] {\n  color: var(--warn-color) !important;\n}\n/*# sourceMappingURL=new-run.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewRunComponent, { className: "NewRunComponent", filePath: "src\\app\\pages\\new-run\\new-run.component.ts", lineNumber: 24 });
})();
export {
  NewRunComponent
};
//# sourceMappingURL=chunk-44KVI262.js.map
