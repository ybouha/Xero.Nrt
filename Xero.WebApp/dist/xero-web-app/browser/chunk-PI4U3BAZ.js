import {
  NrtApiService
} from "./chunk-KB43M2JB.js";
import {
  DxButtonModule,
  DxCheckBoxComponent,
  DxCheckBoxModule,
  DxDataGridModule,
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule,
  DxNumberBoxComponent,
  DxNumberBoxModule,
  DxSelectBoxComponent,
  DxSelectBoxModule,
  DxTagBoxComponent,
  DxTagBoxModule,
  DxTextAreaComponent,
  DxTextAreaModule,
  DxTextBoxComponent,
  DxTextBoxModule
} from "./chunk-VGKFB52G.js";
import {
  ActivatedRoute,
  CommonModule,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  __spreadProps,
  __spreadValues,
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

// src/app/pages/run-definition-form/run-definition-form.component.ts
function RunDefinitionFormComponent_dx_load_indicator_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("visible", ctx_r0.loading);
  }
}
function RunDefinitionFormComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function RunDefinitionFormComponent_div_13_div_103_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "dx-text-box", 56);
    \u0275\u0275listener("onValueChanged", function RunDefinitionFormComponent_div_13_div_103_Template_dx_text_box_onValueChanged_1_listener($event) {
      const i_r4 = \u0275\u0275restoreView(_r3).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateColumnName(i_r4, $event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dx-select-box", 57);
    \u0275\u0275listener("onValueChanged", function RunDefinitionFormComponent_div_13_div_103_Template_dx_select_box_onValueChanged_2_listener($event) {
      const i_r4 = \u0275\u0275restoreView(_r3).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateColumnType(i_r4, $event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 58);
    \u0275\u0275listener("click", function RunDefinitionFormComponent_div_13_div_103_Template_button_click_3_listener() {
      const i_r4 = \u0275\u0275restoreView(_r3).index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeColumn(i_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 4);
    \u0275\u0275element(5, "line", 59)(6, "line", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const col_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", col_r5.name);
    \u0275\u0275advance();
    \u0275\u0275property("value", col_r5.type)("items", ctx_r0.columnTypeOptions);
  }
}
function RunDefinitionFormComponent_div_13_div_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275text(1, "No columns defined \u2014 click Add Column.");
    \u0275\u0275elementEnd();
  }
}
function RunDefinitionFormComponent_div_13_div_126_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 28)(2, "label", 16);
    \u0275\u0275text(3, "Provider");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dx-select-box", 29);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_div_126_Template_dx_select_box_valueChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.output.diffDb.provider, $event) || (ctx_r0.output.diffDb.provider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "label", 16);
    \u0275\u0275text(7, "Connection String");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dx-text-box", 30);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_div_126_Template_dx_text_box_valueChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.output.diffDb.connectionString, $event) || (ctx_r0.output.diffDb.connectionString = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 28)(10, "label", 16);
    \u0275\u0275text(11, "Table Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dx-text-box", 30);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_div_126_Template_dx_text_box_valueChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.output.diffDb.tableName, $event) || (ctx_r0.output.diffDb.tableName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.output.diffDb.provider);
    \u0275\u0275property("items", ctx_r0.providerOptions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.output.diffDb.connectionString);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.output.diffDb.tableName);
  }
}
function RunDefinitionFormComponent_div_13_div_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.saveError);
  }
}
function RunDefinitionFormComponent_div_13_dx_load_indicator_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dx-load-indicator", 62);
  }
}
function RunDefinitionFormComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "Definition Info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14)(5, "div", 15)(6, "label", 16);
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dx-text-box", 17);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_8_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.name, $event) || (ctx_r0.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 18)(10, "label", 16);
    \u0275\u0275text(11, "Scope");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dx-text-box", 19);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_12_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.scope, $event) || (ctx_r0.scope = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 18)(14, "label", 16);
    \u0275\u0275text(15, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dx-text-area", 20);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_area_valueChange_16_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.description, $event) || (ctx_r0.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 12)(18, "div", 13);
    \u0275\u0275text(19, "Pre-Execution Commands ");
    \u0275\u0275elementStart(20, "span", 21);
    \u0275\u0275text(21, "Optional shell commands run before the comparison (e.g. data generation scripts)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 14)(23, "div", 18)(24, "label", 16);
    \u0275\u0275text(25, "Reference Command");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "dx-text-area", 22);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_area_valueChange_26_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.refCommandLine, $event) || (ctx_r0.refCommandLine = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 18)(28, "label", 16);
    \u0275\u0275text(29, "Target Command");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dx-text-area", 23);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_area_valueChange_30_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.targetCommandLine, $event) || (ctx_r0.targetCommandLine = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div", 12)(32, "div", 13);
    \u0275\u0275text(33, "Scenario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 24)(35, "div", 15)(36, "label", 16);
    \u0275\u0275text(37, "Scenario Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "dx-text-box", 25);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_38_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.scenarioName, $event) || (ctx_r0.scenarioName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 15)(40, "label", 16);
    \u0275\u0275text(41, "Reference Version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "dx-text-box", 26);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_42_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.referenceVersion, $event) || (ctx_r0.referenceVersion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 15)(44, "label", 16);
    \u0275\u0275text(45, "Target Version");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "dx-text-box", 27);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_46_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.targetVersion, $event) || (ctx_r0.targetVersion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 12)(48, "div", 13);
    \u0275\u0275text(49, "Reference Database");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 14)(51, "div", 28)(52, "label", 16);
    \u0275\u0275text(53, "Provider");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "dx-select-box", 29);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_select_box_valueChange_54_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.reference.provider, $event) || (ctx_r0.reference.provider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 18)(56, "label", 16);
    \u0275\u0275text(57, "Connection String");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "dx-text-box", 30);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_58_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.reference.connectionString, $event) || (ctx_r0.reference.connectionString = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 28)(60, "label", 16);
    \u0275\u0275text(61, "Timeout (s)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "dx-number-box", 31);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_number_box_valueChange_62_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.reference.timeoutSeconds, $event) || (ctx_r0.reference.timeoutSeconds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 18)(64, "label", 16);
    \u0275\u0275text(65, "Query");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "dx-text-area", 32);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_area_valueChange_66_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.reference.query, $event) || (ctx_r0.reference.query = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(67, "div", 12)(68, "div", 13);
    \u0275\u0275text(69, "Target Database");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 14)(71, "div", 28)(72, "label", 16);
    \u0275\u0275text(73, "Provider");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "dx-select-box", 29);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_select_box_valueChange_74_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.target.provider, $event) || (ctx_r0.target.provider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 18)(76, "label", 16);
    \u0275\u0275text(77, "Connection String");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "dx-text-box", 30);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_box_valueChange_78_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.target.connectionString, $event) || (ctx_r0.target.connectionString = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 28)(80, "label", 16);
    \u0275\u0275text(81, "Timeout (s)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "dx-number-box", 31);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_number_box_valueChange_82_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.target.timeoutSeconds, $event) || (ctx_r0.target.timeoutSeconds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "div", 18)(84, "label", 16);
    \u0275\u0275text(85, "Query");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "dx-text-area", 32);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_text_area_valueChange_86_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.target.query, $event) || (ctx_r0.target.query = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "div", 12)(88, "div", 33)(89, "div", 13);
    \u0275\u0275text(90, "Column Schema");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "button", 34);
    \u0275\u0275listener("click", function RunDefinitionFormComponent_div_13_Template_button_click_91_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addColumn());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(92, "svg", 35);
    \u0275\u0275element(93, "line", 36)(94, "line", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(95, " Add Column ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(96, "div", 38)(97, "div", 39)(98, "span", 40);
    \u0275\u0275text(99, "Column Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "span", 41);
    \u0275\u0275text(101, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275element(102, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275template(103, RunDefinitionFormComponent_div_13_div_103_Template, 7, 3, "div", 43)(104, RunDefinitionFormComponent_div_13_div_104_Template, 2, 0, "div", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "div", 12)(106, "div", 13);
    \u0275\u0275text(107, "Compare Settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "div", 14)(109, "div", 18)(110, "label", 16);
    \u0275\u0275text(111, "Key Properties ");
    \u0275\u0275elementStart(112, "span", 45);
    \u0275\u0275text(113, "Fields that uniquely identify a row");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(114, "dx-tag-box", 46);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_tag_box_valueChange_114_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compare.keyProperties, $event) || (ctx_r0.compare.keyProperties = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "div", 18)(116, "label", 16);
    \u0275\u0275text(117, "Compare Properties ");
    \u0275\u0275elementStart(118, "span", 45);
    \u0275\u0275text(119, "Leave empty to compare all non-key columns");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(120, "dx-tag-box", 47);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_tag_box_valueChange_120_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compare.compareProperties, $event) || (ctx_r0.compare.compareProperties = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(121, "div", 12)(122, "div", 13);
    \u0275\u0275text(123, "Output Settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "div", 48)(125, "dx-check-box", 49);
    \u0275\u0275twoWayListener("valueChange", function RunDefinitionFormComponent_div_13_Template_dx_check_box_valueChange_125_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.output.diffDb.enabled, $event) || (ctx_r0.output.diffDb.enabled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(126, RunDefinitionFormComponent_div_13_div_126_Template, 13, 4, "div", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275template(127, RunDefinitionFormComponent_div_13_div_127_Template, 2, 1, "div", 7);
    \u0275\u0275elementStart(128, "div", 51)(129, "button", 52);
    \u0275\u0275listener("click", function RunDefinitionFormComponent_div_13_Template_button_click_129_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(130, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "button", 53);
    \u0275\u0275listener("click", function RunDefinitionFormComponent_div_13_Template_button_click_131_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275template(132, RunDefinitionFormComponent_div_13_dx_load_indicator_132_Template, 1, 0, "dx-load-indicator", 54);
    \u0275\u0275text(133);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("value", ctx_r0.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.scope);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.description);
    \u0275\u0275property("height", 60);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("value", ctx_r0.refCommandLine);
    \u0275\u0275property("height", 72);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.targetCommandLine);
    \u0275\u0275property("height", 72);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("value", ctx_r0.scenarioName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.referenceVersion);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.targetVersion);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("value", ctx_r0.reference.provider);
    \u0275\u0275property("items", ctx_r0.providerOptions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.reference.connectionString);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.reference.timeoutSeconds);
    \u0275\u0275property("min", 1)("max", 3600);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.reference.query);
    \u0275\u0275property("height", 120);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("value", ctx_r0.target.provider);
    \u0275\u0275property("items", ctx_r0.providerOptions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.target.connectionString);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.target.timeoutSeconds);
    \u0275\u0275property("min", 1)("max", 3600);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("value", ctx_r0.target.query);
    \u0275\u0275property("height", 120);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r0.columnSchema);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.columnSchema.length === 0);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("value", ctx_r0.compare.keyProperties);
    \u0275\u0275property("items", ctx_r0.columnNames)("acceptCustomValue", true)("showSelectionControls", false);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("value", ctx_r0.compare.compareProperties);
    \u0275\u0275property("items", ctx_r0.columnNames)("acceptCustomValue", true)("showSelectionControls", false);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("value", ctx_r0.output.diffDb.enabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.output.diffDb.enabled);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saveError);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving ? "Saving\u2026" : ctx_r0.isEdit ? "Save Changes" : "Create Definition", " ");
  }
}
var RunDefinitionFormComponent = class _RunDefinitionFormComponent {
  get isEdit() {
    return !!this.editId;
  }
  // Tag-box datasource: available column names (updated as user edits schema)
  get columnNames() {
    return this.columnSchema.map((c) => c.name).filter((n) => !!n);
  }
  constructor(route, router, api) {
    this.route = route;
    this.router = router;
    this.api = api;
    this.editId = null;
    this.loading = false;
    this.saving = false;
    this.loadError = "";
    this.saveError = "";
    this.providerOptions = ["PostgreSql", "SqlServer"];
    this.columnTypeOptions = ["string", "decimal", "int", "long", "bool", "double"];
    this.defaultConnStr = "Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y";
    this.name = "";
    this.description = "";
    this.scope = "";
    this.scenarioName = "VaR NRT";
    this.referenceVersion = "prod-2025-01";
    this.targetVersion = "uat-2025-02";
    this.refCommandLine = "";
    this.targetCommandLine = "";
    this.reference = {
      provider: "PostgreSql",
      connectionString: this.defaultConnStr,
      query: "",
      timeoutSeconds: 300
    };
    this.target = {
      provider: "PostgreSql",
      connectionString: this.defaultConnStr,
      query: "",
      timeoutSeconds: 300
    };
    this.compare = {
      keyProperties: [],
      compareProperties: []
    };
    this.output = {
      diffDb: {
        enabled: true,
        provider: "PostgreSql",
        connectionString: this.defaultConnStr,
        tableName: "NrtDiffResults"
      }
    };
    this.columnSchema = [
      { name: "TradeId", type: "string" },
      { name: "Book", type: "string" },
      { name: "Desk", type: "string" },
      { name: "RiskFactor", type: "string" },
      { name: "AssetClass", type: "string" },
      { name: "ValuationDate", type: "string" },
      { name: "Delta", type: "decimal" },
      { name: "Gamma", type: "decimal" },
      { name: "Vega", type: "decimal" },
      { name: "Var1D99", type: "decimal" },
      { name: "SVaR1D99", type: "decimal" },
      { name: "Pnl", type: "decimal" }
    ];
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editId = id;
      this.loadDefinition(id);
    }
  }
  loadDefinition(id) {
    this.loading = true;
    this.loadError = "";
    this.api.getDefinition(id).subscribe({
      next: (def) => {
        this.name = def.name;
        this.description = def.description ?? "";
        this.scope = def.scope ?? "";
        this.scenarioName = def.scenarioName;
        this.referenceVersion = def.referenceVersion;
        this.targetVersion = def.targetVersion;
        this.refCommandLine = def.refCommandLine ?? "";
        this.targetCommandLine = def.targetCommandLine ?? "";
        this.reference = __spreadValues({}, def.reference);
        this.target = __spreadValues({}, def.target);
        this.compare = {
          keyProperties: [...def.compare.keyProperties],
          compareProperties: [...def.compare.compareProperties]
        };
        this.output = {
          diffDb: __spreadValues({}, def.output.diffDb)
        };
        this.columnSchema = def.columnSchema.map((c) => __spreadValues({}, c));
        this.loading = false;
      },
      error: (err) => {
        this.loadError = err?.error?.detail ?? err?.message ?? "Failed to load definition.";
        this.loading = false;
      }
    });
  }
  // ── Column schema helpers ────────────────────────────────────────────────────
  addColumn() {
    this.columnSchema = [...this.columnSchema, { name: "", type: "string" }];
  }
  removeColumn(index) {
    this.columnSchema = this.columnSchema.filter((_, i) => i !== index);
  }
  updateColumnName(index, name) {
    this.columnSchema = this.columnSchema.map((col, i) => i === index ? __spreadProps(__spreadValues({}, col), { name }) : col);
  }
  updateColumnType(index, type) {
    this.columnSchema = this.columnSchema.map((col, i) => i === index ? __spreadProps(__spreadValues({}, col), { type }) : col);
  }
  // ── Save ────────────────────────────────────────────────────────────────────
  save() {
    this.saveError = "";
    if (!this.name.trim()) {
      this.saveError = "Name is required.";
      return;
    }
    if (!this.scenarioName.trim()) {
      this.saveError = "Scenario name is required.";
      return;
    }
    const req = {
      name: this.name.trim(),
      description: this.description.trim() || void 0,
      scope: this.scope.trim() || void 0,
      scenarioName: this.scenarioName.trim(),
      referenceVersion: this.referenceVersion.trim(),
      targetVersion: this.targetVersion.trim(),
      refCommandLine: this.refCommandLine.trim() || void 0,
      targetCommandLine: this.targetCommandLine.trim() || void 0,
      reference: __spreadValues({}, this.reference),
      target: __spreadValues({}, this.target),
      compare: __spreadValues({}, this.compare),
      output: { diffDb: __spreadValues({}, this.output.diffDb) },
      columnSchema: this.columnSchema.filter((c) => c.name.trim())
    };
    this.saving = true;
    if (this.isEdit) {
      this.api.updateDefinition(this.editId, req).subscribe({
        next: () => this.router.navigate(["/run-definitions"]),
        error: (err) => {
          this.saveError = err?.error?.detail ?? err?.message ?? "Save failed.";
          this.saving = false;
        }
      });
    } else {
      this.api.createDefinition(req).subscribe({
        next: () => this.router.navigate(["/run-definitions"]),
        error: (err) => {
          this.saveError = err?.error?.detail ?? err?.message ?? "Save failed.";
          this.saving = false;
        }
      });
    }
  }
  cancel() {
    this.router.navigate(["/run-definitions"]);
  }
  static {
    this.\u0275fac = function RunDefinitionFormComponent_Factory(t) {
      return new (t || _RunDefinitionFormComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NrtApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RunDefinitionFormComponent, selectors: [["app-run-definition-form"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 5, consts: [[1, "def-form-page"], [1, "page-header"], [1, "breadcrumb"], ["routerLink", "/run-definitions", 1, "breadcrumb-link"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M9 18l6-6-6-6"], ["height", "36", "width", "36", "class", "page-loader", 3, "visible", 4, "ngIf"], ["class", "error-banner", 4, "ngIf"], ["class", "form-body", 4, "ngIf"], ["height", "36", "width", "36", 1, "page-loader", 3, "visible"], [1, "error-banner"], [1, "form-body"], [1, "form-section", "card"], [1, "section-title"], [1, "field-row"], [1, "field-group", "required"], [1, "field-label"], ["placeholder", "e.g. VaR NRT \u2013 Prod vs UAT", "stylingMode", "outlined", 3, "valueChange", "value"], [1, "field-group"], ["placeholder", "e.g. Trading Book", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "Optional description\u2026", "stylingMode", "outlined", 3, "valueChange", "value", "height"], [1, "section-hint"], ["placeholder", "e.g. python generate_ref.py --date {valuationDate}", "stylingMode", "outlined", 3, "valueChange", "value", "height"], ["placeholder", "e.g. dotnet run --project GenTarget -- --date {valuationDate}", "stylingMode", "outlined", 3, "valueChange", "value", "height"], [1, "field-row", "three"], ["placeholder", "e.g. VaR NRT", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "e.g. prod-2025-01", "stylingMode", "outlined", 3, "valueChange", "value"], ["placeholder", "e.g. uat-2025-02", "stylingMode", "outlined", 3, "valueChange", "value"], [1, "field-group", "narrow"], ["stylingMode", "outlined", 3, "valueChange", "value", "items"], ["stylingMode", "outlined", 3, "valueChange", "value"], ["stylingMode", "outlined", 3, "valueChange", "value", "min", "max"], ["stylingMode", "outlined", "placeholder", "SELECT ... FROM ... WHERE valuation_date::text = @ValuationDate", 3, "valueChange", "value", "height"], [1, "section-header-row"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "schema-table"], [1, "schema-header"], [1, "col-name"], [1, "col-type"], [1, "col-del"], ["class", "schema-row", 4, "ngFor", "ngForOf"], ["class", "schema-empty", 4, "ngIf"], [1, "field-hint"], ["stylingMode", "outlined", "placeholder", "Select or type key columns\u2026", 3, "valueChange", "value", "items", "acceptCustomValue", "showSelectionControls"], ["stylingMode", "outlined", "placeholder", "All non-key columns (default)", 3, "valueChange", "value", "items", "acceptCustomValue", "showSelectionControls"], [1, "field-row", "align-center"], ["text", "Save diffs to database", 3, "valueChange", "value"], ["class", "field-row", 4, "ngIf"], [1, "form-footer"], [1, "btn", "btn-ghost", 3, "click", "disabled"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["height", "16", "width", "16", 4, "ngIf"], [1, "schema-row"], ["stylingMode", "outlined", "placeholder", "ColumnName", 1, "col-name", 3, "onValueChanged", "value"], ["stylingMode", "outlined", 1, "col-type", 3, "onValueChanged", "value", "items"], ["title", "Remove", 1, "btn-del", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "schema-empty"], ["height", "16", "width", "16"]], template: function RunDefinitionFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        \u0275\u0275text(4, "Run Definitions");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(5, "svg", 4);
        \u0275\u0275element(6, "path", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(7, "span");
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "h1");
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(11, RunDefinitionFormComponent_dx_load_indicator_11_Template, 1, 1, "dx-load-indicator", 6)(12, RunDefinitionFormComponent_div_12_Template, 2, 1, "div", 7)(13, RunDefinitionFormComponent_div_13_Template, 134, 44, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.isEdit ? "Edit Definition" : "New Definition");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.isEdit ? "Edit Definition" : "New Definition");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loadError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      RouterLink,
      DxButtonModule,
      DxLoadIndicatorModule,
      DxLoadIndicatorComponent,
      DxTextAreaModule,
      DxTextAreaComponent,
      DxTagBoxModule,
      DxTagBoxComponent,
      DxSelectBoxModule,
      DxSelectBoxComponent,
      DxTextBoxModule,
      DxTextBoxComponent,
      DxDataGridModule,
      DxCheckBoxModule,
      DxCheckBoxComponent,
      DxNumberBoxModule,
      DxNumberBoxComponent
    ], styles: ['\n\n.def-form-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 4px 0 0;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n}\n.breadcrumb[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.breadcrumb-link[_ngcontent-%COMP%] {\n  color: var(--accent);\n  text-decoration: none;\n}\n.breadcrumb-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.page-loader[_ngcontent-%COMP%] {\n  display: block;\n  margin: 60px auto;\n}\n.form-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.form-section[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.section-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 400;\n  color: var(--text-secondary);\n}\n.section-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.section-header-row[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 14px;\n  align-items: flex-start;\n}\n.field-row.three[_ngcontent-%COMP%]    > .field-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.field-row.align-center[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.field-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-group[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-group.narrow[_ngcontent-%COMP%] {\n  flex: 0 0 160px;\n}\n.field-group.required[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: var(--fail-color, #f66d6d);\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 400;\n  color: var(--text-secondary);\n  opacity: 0.75;\n}\n.schema-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.schema-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  padding: 0 4px 4px;\n}\n.schema-header[_ngcontent-%COMP%]   .col-name[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.schema-header[_ngcontent-%COMP%]   .col-type[_ngcontent-%COMP%] {\n  width: 130px;\n}\n.schema-header[_ngcontent-%COMP%]   .col-del[_ngcontent-%COMP%] {\n  width: 28px;\n}\n.schema-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.schema-row[_ngcontent-%COMP%]   .col-name[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.schema-row[_ngcontent-%COMP%]   .col-type[_ngcontent-%COMP%] {\n  width: 130px;\n}\n.schema-empty[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  padding: 8px 4px;\n  font-style: italic;\n}\n.btn-del[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  color: var(--text-secondary);\n  flex-shrink: 0;\n  transition: color 0.15s, background 0.15s;\n}\n.btn-del[_ngcontent-%COMP%]:hover {\n  color: var(--fail-color, #f66d6d);\n  background: rgba(246, 109, 109, 0.1);\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  font-size: 12px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--card-border);\n  color: var(--text-primary);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--accent);\n}\n.error-banner[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--fail-color, #f66d6d);\n  background: rgba(246, 109, 109, 0.08);\n  border: 1px solid rgba(246, 109, 109, 0.2);\n  border-radius: 8px;\n  padding: 10px 14px;\n}\n.form-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-bottom: 32px;\n}\n/*# sourceMappingURL=run-definition-form.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RunDefinitionFormComponent, { className: "RunDefinitionFormComponent", filePath: "src\\app\\pages\\run-definition-form\\run-definition-form.component.ts", lineNumber: 36 });
})();
export {
  RunDefinitionFormComponent
};
//# sourceMappingURL=chunk-PI4U3BAZ.js.map
