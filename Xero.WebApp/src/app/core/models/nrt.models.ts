// ── API response models ────────────────────────────────────────────────────────

export interface NrtRunSummary {
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
}

export interface NrtRunResponse extends NrtRunSummary {
  durationSeconds: number;
}

export interface DiffResultDto {
  id: number;
  runTimestamp: string;
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  tradeId: string | null;
  book: string | null;
  desk: string | null;
  riskFactor: string | null;
  valuationDate: string | null;
  diffType: string | null;
  diffs: string | null;
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

export interface NrtRunRequest {
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  valuationDate: string;
  reference: DbSettingsDto;
  target: DbSettingsDto;
  compare: CompareSettingsDto;
  output: OutputSettingsDto;
}

// ── Filter model for diff queries ─────────────────────────────────────────────

export interface DiffFilter {
  diffType?: string;
  tradeId?: string;
  book?: string;
  desk?: string;
  page: number;
  pageSize: number;
}
