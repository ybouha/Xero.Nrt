import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DiffFilter, DiffResultDto, NrtRunSummary, PagedResult } from '../models/nrt.models';

@Injectable({ providedIn: 'root' })
export class ResultViewerService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getRuns(page = 1, pageSize = 20): Observable<PagedResult<NrtRunSummary>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<PagedResult<NrtRunSummary>>(`${this.base}/runs`, { params });
  }

  getRun(runId: number): Observable<NrtRunSummary> {
    return this.http.get<NrtRunSummary>(`${this.base}/runs/${runId}`);
  }

  getDiffsForRun(runId: number, filter: DiffFilter): Observable<PagedResult<DiffResultDto>> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('pageSize', filter.pageSize);
    if (filter.diffType) params = params.set('diffType', filter.diffType);
    return this.http.get<PagedResult<DiffResultDto>>(`${this.base}/runs/${runId}/diffs`, { params });
  }

  getDiffs(filter: DiffFilter): Observable<PagedResult<DiffResultDto>> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('pageSize', filter.pageSize);
    if (filter.diffType) params = params.set('diffType', filter.diffType);
    return this.http.get<PagedResult<DiffResultDto>>(`${this.base}/diffs`, { params });
  }

  getDiff(id: number): Observable<DiffResultDto> {
    return this.http.get<DiffResultDto>(`${this.base}/diffs/${id}`);
  }
}
