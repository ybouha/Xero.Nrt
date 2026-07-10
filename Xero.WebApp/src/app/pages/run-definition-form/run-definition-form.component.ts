import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  DxButtonModule,
  DxLoadIndicatorModule,
  DxTextAreaModule,
  DxTagBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxDataGridModule,
  DxCheckBoxModule,
  DxNumberBoxModule,
} from 'devextreme-angular';
import { NrtApiService } from '../../core/services/nrt-api.service';
import {
  ColumnDef,
  DbSettingsDto,
  CompareSettingsDto,
  OutputSettingsDto,
  SaveNrtRunDefinitionRequest,
} from '../../core/models/nrt.models';

@Component({
  selector: 'app-run-definition-form',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    DxButtonModule, DxLoadIndicatorModule,
    DxTextAreaModule, DxTagBoxModule, DxSelectBoxModule,
    DxTextBoxModule, DxDataGridModule, DxCheckBoxModule, DxNumberBoxModule,
  ],
  templateUrl: './run-definition-form.component.html',
  styleUrls: ['./run-definition-form.component.scss'],
})
export class RunDefinitionFormComponent implements OnInit {

  editId: string | null = null;
  get isEdit(): boolean { return !!this.editId; }

  loading     = false;
  saving      = false;
  loadError   = '';
  saveError   = '';

  readonly providerOptions  = ['PostgreSql', 'SqlServer', 'Couchbase'];
  readonly columnTypeOptions = ['string', 'decimal', 'int', 'long', 'bool', 'double'];

  private readonly defaultConnStr =
    'Host=localhost;Port=5433;Database=Xero;Username=postgres;Password=tc0ab1y';

  // ── Form fields ─────────────────────────────────────────────────────────────
  name             = '';
  description      = '';
  scope            = '';
  scenarioName     = 'VaR NRT';
  referenceVersion = 'prod-2025-01';
  targetVersion    = 'uat-2025-02';
  refCommandLine   = '';
  targetCommandLine = '';

  reference: DbSettingsDto = {
    provider:         'PostgreSql',
    connectionString: this.defaultConnStr,
    query:            '',
    timeoutSeconds:   300,
  };

  target: DbSettingsDto = {
    provider:         'PostgreSql',
    connectionString: this.defaultConnStr,
    query:            '',
    timeoutSeconds:   300,
  };

  compare: CompareSettingsDto = {
    keyProperties:     [],
    compareProperties: [],
  };

  output: OutputSettingsDto = {
    diffDb: {
      enabled:          true,
      connectionString: this.defaultConnStr,
      tableName:        'NrtDiffResults',
    },
  };

  columnSchema: ColumnDef[] = [
    { name: 'TradeId',       type: 'string'  },
    { name: 'Book',          type: 'string'  },
    { name: 'Desk',          type: 'string'  },
    { name: 'RiskFactor',    type: 'string'  },
    { name: 'AssetClass',    type: 'string'  },
    { name: 'ValuationDate', type: 'string'  },
    { name: 'Delta',         type: 'decimal' },
    { name: 'Gamma',         type: 'decimal' },
    { name: 'Vega',          type: 'decimal' },
    { name: 'Var1D99',       type: 'decimal' },
    { name: 'SVaR1D99',      type: 'decimal' },
    { name: 'Pnl',           type: 'decimal' },
  ];

  // Tag-box datasource: stable reference updated only when columnSchema identity changes
  private _prevColumnSchema: ColumnDef[] | null = null;
  private _columnNames: string[] = [];
  get columnNames(): string[] {
    if (this._prevColumnSchema !== this.columnSchema) {
      this._prevColumnSchema = this.columnSchema;
      this._columnNames = this.columnSchema.map(c => c.name).filter(n => !!n);
    }
    return this._columnNames;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: NrtApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = id;
      this.loadDefinition(id);
    }
  }

  private loadDefinition(id: string): void {
    this.loading   = true;
    this.loadError = '';
    this.api.getDefinition(id).subscribe({
      next: def => {
        this.name              = def.name;
        this.description       = def.description  ?? '';
        this.scope             = def.scope         ?? '';
        this.scenarioName      = def.scenarioName;
        this.referenceVersion  = def.referenceVersion;
        this.targetVersion     = def.targetVersion;
        this.refCommandLine    = def.refCommandLine    ?? '';
        this.targetCommandLine = def.targetCommandLine ?? '';
        this.reference         = { ...def.reference };
        this.target            = { ...def.target };
        this.compare           = {
          keyProperties:     [...def.compare.keyProperties],
          compareProperties: [...def.compare.compareProperties],
        };
        this.output = {
          diffDb: { ...def.output.diffDb },
        };
        this.columnSchema = def.columnSchema.map(c => ({ ...c }));
        this.loading = false;
      },
      error: (err) => {
        this.loadError = err?.error?.detail ?? err?.message ?? 'Failed to load definition.';
        this.loading   = false;
      },
    });
  }

  // ── Column schema helpers ────────────────────────────────────────────────────
  addColumn(): void {
    this.columnSchema = [...this.columnSchema, { name: '', type: 'string' }];
  }

  removeColumn(index: number): void {
    this.columnSchema = this.columnSchema.filter((_, i) => i !== index);
  }

  updateColumnName(index: number, name: string): void {
    this.columnSchema = this.columnSchema.map((col, i) =>
      i === index ? { ...col, name } : col,
    );
  }

  updateColumnType(index: number, type: string): void {
    this.columnSchema = this.columnSchema.map((col, i) =>
      i === index ? { ...col, type } : col,
    );
  }

  // ── Save ────────────────────────────────────────────────────────────────────
  save(): void {
    this.saveError = '';

    if (!this.name.trim()) {
      this.saveError = 'Name is required.';
      return;
    }
    if (!this.scenarioName.trim()) {
      this.saveError = 'Scenario name is required.';
      return;
    }

    const req: SaveNrtRunDefinitionRequest = {
      name:              this.name.trim(),
      description:       this.description.trim() || undefined,
      scope:             this.scope.trim()        || undefined,
      scenarioName:      this.scenarioName.trim(),
      referenceVersion:  this.referenceVersion.trim(),
      targetVersion:     this.targetVersion.trim(),
      refCommandLine:    this.refCommandLine.trim()    || undefined,
      targetCommandLine: this.targetCommandLine.trim() || undefined,
      reference:         { ...this.reference },
      target:            { ...this.target },
      compare:           { ...this.compare },
      output:            { diffDb: { ...this.output.diffDb } },
      columnSchema:      this.columnSchema.filter(c => c.name.trim()),
    };

    this.saving = true;

    if (this.isEdit) {
      this.api.updateDefinition(this.editId!, req).subscribe({
        next: () => this.router.navigate(['/run-definitions']),
        error: (err) => {
          this.saveError = err?.error?.detail ?? err?.message ?? 'Save failed.';
          this.saving    = false;
        },
      });
    } else {
      this.api.createDefinition(req).subscribe({
        next: () => this.router.navigate(['/run-definitions']),
        error: (err) => {
          this.saveError = err?.error?.detail ?? err?.message ?? 'Save failed.';
          this.saving    = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/run-definitions']);
  }
}
