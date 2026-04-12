import {
  environment
} from "./chunk-K34UMMAL.js";
import {
  HttpClient,
  HttpParams,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-QNHS4Y2U.js";

// src/app/core/services/result-viewer.service.ts
var ResultViewerService = class _ResultViewerService {
  constructor(http) {
    this.http = http;
    this.base = environment.viewerApiBaseUrl;
  }
  getRuns(page = 1, pageSize = 20) {
    const params = new HttpParams().set("page", page).set("pageSize", pageSize);
    return this.http.get(`${this.base}/runs`, { params });
  }
  getRun(runId) {
    return this.http.get(`${this.base}/runs/${runId}`);
  }
  getDiffsForRun(runId, filter) {
    let params = new HttpParams().set("page", filter.page).set("pageSize", filter.pageSize);
    if (filter.diffType)
      params = params.set("diffType", filter.diffType);
    if (filter.tradeId)
      params = params.set("tradeId", filter.tradeId);
    if (filter.book)
      params = params.set("book", filter.book);
    if (filter.desk)
      params = params.set("desk", filter.desk);
    return this.http.get(`${this.base}/runs/${runId}/diffs`, { params });
  }
  getDiffs(filter) {
    let params = new HttpParams().set("page", filter.page).set("pageSize", filter.pageSize);
    if (filter.diffType)
      params = params.set("diffType", filter.diffType);
    if (filter.tradeId)
      params = params.set("tradeId", filter.tradeId);
    if (filter.book)
      params = params.set("book", filter.book);
    if (filter.desk)
      params = params.set("desk", filter.desk);
    return this.http.get(`${this.base}/diffs`, { params });
  }
  getDiff(id) {
    return this.http.get(`${this.base}/diffs/${id}`);
  }
  static {
    this.\u0275fac = function ResultViewerService_Factory(t) {
      return new (t || _ResultViewerService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ResultViewerService, factory: _ResultViewerService.\u0275fac, providedIn: "root" });
  }
};

export {
  ResultViewerService
};
//# sourceMappingURL=chunk-AJMCEA7E.js.map
