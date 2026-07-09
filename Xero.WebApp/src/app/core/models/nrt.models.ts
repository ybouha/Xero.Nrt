// ── API response models ────────────────────────────────────────────────────────

/** Single column in a dynamic row schema — mirrors C# ColumnDef record. */
export interface ColumnDef {
  name: string;
  /** 'string' | 'decimal' | 'int' | 'long' | 'bool' | 'double' */
  type: string;
}

export interface RunExecutionSummary {
  runId: number;
  runTimestamp: string;
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  valuationDate: string;
  refRowCount: number | null;
  tgtRowCount: number | null;
  diffRowCount: number | null;
  onlyInRefCount: number | null;
  onlyInTgtCount: number | null;
  passed: boolean | null;
  /** Raw JSON string of ColumnDef[] stored when the run was submitted. */
  columnSchemaJson: string | null;

  // ── Status tracking ──────────────────────────────────────────────────────────
  /** pending | running_commands | running_comparison | saving_results | completed | failed */
  status: string;
  errorMessage?: string;
  refCmdStatus?: string;
  tgtCmdStatus?: string;
  refCmdStartedAt?: string;
  refCmdFinishedAt?: string;
  refCmdExitCode?: number;
  refCmdError?: string;
  tgtCmdStartedAt?: string;
  tgtCmdFinishedAt?: string;
  tgtCmdExitCode?: number;
  tgtCmdError?: string;
  comparisonStartedAt?: string;
  savingStartedAt?: string;
  finishedAt?: string;
  definitionId?: string;

  // ── Snapshot of queries / scripts captured at run creation time ───────────────
  refQuery?: string;
  targetQuery?: string;
  refScript?: string;
  targetScript?: string;
}

/** A single correlated log line for an NRT run (mirrors C# RunLogDto). */
export interface RunLogEntry {
  timestamp: string;
  level: string;
  message: string;
  exception?: string;
  sourceContext?: string;
}

/** @deprecated Use RunExecutionSummary */
export type NrtRunSummary = RunExecutionSummary;

/** Helper: parse columnSchemaJson → ColumnDef[]. Returns [] if null/invalid. */
export function parseColumnSchema(run: RunExecutionSummary): ColumnDef[] {
  if (!run.columnSchemaJson) return [];
  try {
    const raw = JSON.parse(run.columnSchemaJson) as any[];
    return raw.map(c => ({
      name: c.name ?? c.Name ?? '',
      type: c.type ?? c.Type ?? 'string',
    }));
  }
  catch { return []; }
}

export interface RunExecutionResponse extends RunExecutionSummary {
  durationSeconds: number;
  // Counts are always populated on a completed POST response
  refRowCount: number;
  tgtRowCount: number;
  diffRowCount: number;
  onlyInRefCount: number;
  onlyInTgtCount: number;
  passed: boolean;
}

export interface DiffResultDto {
  id: number;
  runTimestamp: string;
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  diffType: string | null;
  /** JSON object: { "FieldName": { "Ref": value, "Tgt": value }, … } */
  diffs: string | null;
  /**
   * JSON array of the item(s) involved: [refItem, tgtItem] or [item].
   * Key column values are read from here using the run's ColumnSchema.
   */
  compareItems: string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── Request models ─────────────────────────────────────────────────────────────

export type DbProvider = 'SqlServer' | 'PostgreSql';

export interface DbSettingsDto {
  provider: DbProvider;
  connectionString: string;
  query: string;
  timeoutSeconds: number;
}

export interface CompareSettingsDto {
  keyProperties: string[];
  compareProperties: string[];
}

export interface DiffDbSettingsDto {
  enabled: boolean;
  provider: DbProvider;
  connectionString: string;
  tableName: string;
}

export interface OutputSettingsDto {
  diffDb: DiffDbSettingsDto;
}

// ── Filter model for diff queries ─────────────────────────────────────────────

export interface DiffFilter {
  diffType?: string;
  page: number;
  pageSize: number;
}

// ── Run Definition models ──────────────────────────────────────────────────────

export interface NrtRunDefinitionSummary {
  definitionId: string;
  name: string;
  description?: string;
  scope?: string;
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  refCommandLine?: string;
  targetCommandLine?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface NrtRunDefinition extends NrtRunDefinitionSummary {
  reference: DbSettingsDto;
  target: DbSettingsDto;
  compare: CompareSettingsDto;
  output: OutputSettingsDto;
  columnSchema: ColumnDef[];
}

export interface SaveNrtRunDefinitionRequest {
  name: string;
  description?: string;
  scope?: string;
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  refCommandLine?: string;
  targetCommandLine?: string;
  reference: DbSettingsDto;
  target: DbSettingsDto;
  compare: CompareSettingsDto;
  output: OutputSettingsDto;
  columnSchema: ColumnDef[];
}

export interface ExecuteFromDefinitionRequest {
  valuationDate: string;
}

// ── Run Schedule models ────────────────────────────────────────────────────────

export interface NrtRunSchedule {
  scheduleId: string;
  definitionId: string;
  name: string;
  cronExpression: string;
  timeZone?: string;
  /** Fixed ISO date (yyyy-MM-dd) used for every fire; null = the run day. */
  valuationDate?: string;
  isEnabled: boolean;
  lastRunAt?: string;
  lastRunId?: number;
  lastStatus?: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
  definitionName?: string;
  nextFireTime?: string;
}

export interface SaveNrtRunScheduleRequest {
  definitionId: string;
  name: string;
  cronExpression: string;
  timeZone?: string;
  valuationDate?: string;
  isEnabled: boolean;
}
