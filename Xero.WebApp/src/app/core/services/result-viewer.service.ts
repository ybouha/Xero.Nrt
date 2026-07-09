import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DiffFilter, DiffResultDto, RunExecutionSummary, RunLogEntry, PagedResult } from '../models/nrt.models';

@Injectable({ providedIn: 'root' })
export class ResultViewerService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getRuns(page = 1, pageSize = 20): Observable<PagedResult<RunExecutionSummary>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<PagedResult<RunExecutionSummary>>(`${this.base}/runs`, { params });
  }

  getRun(runId: number): Observable<RunExecutionSummary> {
    return this.http.get<RunExecutionSummary>(`${this.base}/runs/${runId}`);
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

  getRunLogs(runId: number): Observable<RunLogEntry[]> {
    return this.http.get<RunLogEntry[]>(`${this.base}/runs/${runId}/logs`);
  }
}
