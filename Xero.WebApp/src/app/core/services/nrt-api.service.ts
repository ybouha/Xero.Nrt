import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NrtRunRequest, NrtRunResponse, NrtRunSummary } from '../models/nrt.models';

@Injectable({ providedIn: 'root' })
export class NrtApiService {
  private readonly base = environment.nrtApiBaseUrl;

  constructor(private http: HttpClient) {}

  executeRun(request: NrtRunRequest): Observable<NrtRunResponse> {
    return this.http.post<NrtRunResponse>(`${this.base}/runs`, request);
  }

  getRuns(page = 1, pageSize = 20): Observable<NrtRunSummary[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<NrtRunSummary[]>(`${this.base}/runs`, { params });
  }

  getRun(runId: number): Observable<NrtRunSummary> {
    return this.http.get<NrtRunSummary>(`${this.base}/runs/${runId}`);
  }
}
