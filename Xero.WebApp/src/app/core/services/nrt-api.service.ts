import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ExecuteFromDefinitionRequest,
  NrtRunDefinition,
  NrtRunDefinitionSummary,
  NrtRunSchedule,
  RunExecutionResponse,
  RunExecutionSummary,
  SaveNrtRunDefinitionRequest,
  SaveNrtRunScheduleRequest,
} from '../models/nrt.models';

@Injectable({ providedIn: 'root' })
export class NrtApiService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // ── Run Executions ───────────────────────────────────────────────────────────

  getRuns(page = 1, pageSize = 20): Observable<RunExecutionSummary[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<RunExecutionSummary[]>(`${this.base}/run-executions`, { params });
  }

  getRun(runId: number): Observable<RunExecutionSummary> {
    return this.http.get<RunExecutionSummary>(`${this.base}/run-executions/${runId}`);
  }

  // ── Run Definitions ──────────────────────────────────────────────────────────

  getDefinitions(): Observable<NrtRunDefinitionSummary[]> {
    return this.http.get<NrtRunDefinitionSummary[]>(`${this.base}/run-definitions`);
  }

  getDefinition(id: string): Observable<NrtRunDefinition> {
    return this.http.get<NrtRunDefinition>(`${this.base}/run-definitions/${id}`);
  }

  createDefinition(req: SaveNrtRunDefinitionRequest): Observable<{ definitionId: string }> {
    return this.http.post<{ definitionId: string }>(`${this.base}/run-definitions`, req);
  }

  updateDefinition(id: string, req: SaveNrtRunDefinitionRequest): Observable<void> {
    return this.http.put<void>(`${this.base}/run-definitions/${id}`, req);
  }

  deleteDefinition(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/run-definitions/${id}`);
  }

  executeFromDefinition(id: string, req: ExecuteFromDefinitionRequest): Observable<RunExecutionResponse> {
    return this.http.post<RunExecutionResponse>(`${this.base}/run-definitions/${id}/execute`, req);
  }

  // ── Run Schedules ────────────────────────────────────────────────────────────

  getSchedules(): Observable<NrtRunSchedule[]> {
    return this.http.get<NrtRunSchedule[]>(`${this.base}/run-schedules`);
  }

  getSchedule(id: string): Observable<NrtRunSchedule> {
    return this.http.get<NrtRunSchedule>(`${this.base}/run-schedules/${id}`);
  }

  createSchedule(req: SaveNrtRunScheduleRequest): Observable<{ scheduleId: string }> {
    return this.http.post<{ scheduleId: string }>(`${this.base}/run-schedules`, req);
  }

  updateSchedule(id: string, req: SaveNrtRunScheduleRequest): Observable<void> {
    return this.http.put<void>(`${this.base}/run-schedules/${id}`, req);
  }

  setScheduleEnabled(id: string, enabled: boolean): Observable<void> {
    const params = new HttpParams().set('enabled', enabled);
    return this.http.patch<void>(`${this.base}/run-schedules/${id}/enabled`, null, { params });
  }

  deleteSchedule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/run-schedules/${id}`);
  }

  triggerSchedule(id: string): Observable<void> {
    return this.http.post<void>(`${this.base}/run-schedules/${id}/trigger`, null);
  }
}
