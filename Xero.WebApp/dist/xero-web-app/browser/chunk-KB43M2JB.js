import {
  environment
} from "./chunk-VGKFB52G.js";
import {
  HttpClient,
  HttpParams,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WGIWJJBP.js";

// src/app/core/services/nrt-api.service.ts
var NrtApiService = class _NrtApiService {
  constructor(http) {
    this.http = http;
    this.base = environment.apiBaseUrl;
  }
  // ── Run Executions ───────────────────────────────────────────────────────────
  executeRun(request) {
    return this.http.post(`${this.base}/run-executions`, request);
  }
  getRuns(page = 1, pageSize = 20) {
    const params = new HttpParams().set("page", page).set("pageSize", pageSize);
    return this.http.get(`${this.base}/run-executions`, { params });
  }
  getRun(runId) {
    return this.http.get(`${this.base}/run-executions/${runId}`);
  }
  // ── Run Definitions ──────────────────────────────────────────────────────────
  getDefinitions() {
    return this.http.get(`${this.base}/run-definitions`);
  }
  getDefinition(id) {
    return this.http.get(`${this.base}/run-definitions/${id}`);
  }
  createDefinition(req) {
    return this.http.post(`${this.base}/run-definitions`, req);
  }
  updateDefinition(id, req) {
    return this.http.put(`${this.base}/run-definitions/${id}`, req);
  }
  deleteDefinition(id) {
    return this.http.delete(`${this.base}/run-definitions/${id}`);
  }
  executeFromDefinition(id, req) {
    return this.http.post(`${this.base}/run-definitions/${id}/execute`, req);
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

export {
  NrtApiService
};
//# sourceMappingURL=chunk-KB43M2JB.js.map
