// ── API response models ────────────────────────────────────────────────────────

/** Single column in a dynamic row schema — mirrors C# ColumnDef record. */
export interface ColumnDef {
  name: string;
  /** 'string' | 'decimal' | 'int' | 'long' | 'bool' | 'double' */
  type: string;
}

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
  /** Raw JSON string of ColumnDef[] stored when the run was submitted. */
  columnSchemaJson: string | null;
}

/** Helper: parse columnSchemaJson → ColumnDef[]. Returns [] if null/invalid.
 *  Handles both camelCase ({name, type}) and PascalCase ({Name, Type}) keys
 *  because C# serializes ColumnDef records with PascalCase by default.
 */
export function parseColumnSchema(run: NrtRunSummary): ColumnDef[] {
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

export interface NrtRunResponse extends NrtRunSummary {
  durationSeconds: number;
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

export interface NrtRunRequest {
  scenarioName: string;
  referenceVersion: string;
  targetVersion: string;
  valuationDate: string;
  reference: DbSettingsDto;
  target: DbSettingsDto;
  compare: CompareSettingsDto;
  output: OutputSettingsDto;
  /** Column schema used to generate the runtime CLR type via IL Emit. */
  columnSchema: ColumnDef[];
}

// ── Filter model for diff queries ─────────────────────────────────────────────

export interface DiffFilter {
  diffType?: string;
  page: number;
  pageSize: number;
}
