import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  DxFormModule,
  DxButtonModule,
  DxLoadIndicatorModule,
  DxTextAreaModule,
  DxTagBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { NrtApiService } from '../../core/services/nrt-api.service';
import { ColumnDef, NrtRunRequest, NrtRunResponse } from '../../core/models/nrt.models';

@Component({
  selector: 'app-new-run',
  standalone: true,
  imports: [
    CommonModule,
    DxFormModule, DxButtonModule, DxLoadIndicatorModule,
    DxTextAreaModule, DxTagBoxModule, DxSelectBoxModule, DxTextBoxModule,
  ],
  templateUrl: './new-run.component.html',
  styleUrls: ['./new-run.component.scss'],
})
export class NewRunComponent {
  submitting = false;
  result: NrtRunResponse | null = null;
  error: string | null = null;

  readonly providerOptions = ['PostgreSql', 'SqlServer'];

  readonly columnTypeOptions = ['string', 'decimal', 'int', 'long', 'bool', 'double'];

  readonly defaultConnStr = 'Host=localhost;Port=5432;Database=Xero;Username=postgres;Password=tc0ab1y';

  readonly defaultRefQuery = `SELECT trade_id AS "TradeId", book AS "Book", desk AS "Desk",
  risk_factor AS "RiskFactor", asset_class AS "AssetClass",
  valuation_date::text AS "ValuationDate",
  delta AS "Delta", gamma AS "Gamma", vega AS "Vega",
  var_1d_99 AS "Var1D99", svar_1d_99 AS "SVaR1D99", pnl AS "Pnl"
FROM nrt_reference_data
WHERE valuation_date::text = @ValuationDate
ORDER BY trade_id`;

  readonly defaultTgtQuery = `SELECT trade_id AS "TradeId", book AS "Book", desk AS "Desk",
  risk_factor AS "RiskFactor", asset_class AS "AssetClass",
  valuation_date::text AS "ValuationDate",
  delta AS "Delta", gamma AS "Gamma", vega AS "Vega",
  var_1d_99 AS "Var1D99", svar_1d_99 AS "SVaR1D99", pnl AS "Pnl"
FROM nrt_target_data
WHERE valuation_date::text = @ValuationDate
ORDER BY trade_id`;

  readonly defaultColumnSchema: ColumnDef[] = [
    { name: 'TradeId',      type: 'string'  },
    { name: 'Book',         type: 'string'  },
    { name: 'Desk',         type: 'string'  },
    { name: 'RiskFactor',   type: 'string'  },
    { name: 'AssetClass',   type: 'string'  },
    { name: 'ValuationDate',type: 'string'  },
    { name: 'Delta',        type: 'decimal' },
    { name: 'Gamma',        type: 'decimal' },
    { name: 'Vega',         type: 'decimal' },
    { name: 'Var1D99',      type: 'decimal' },
    { name: 'SVaR1D99',     type: 'decimal' },
    { name: 'Pnl',          type: 'decimal' },
  ];

  formData: NrtRunRequest = {
    scenarioName:     'VaR NRT',
    referenceVersion: 'prod-2025-01',
    targetVersion:    'uat-2025-02',
    valuationDate:    '2025-01-31',
    reference: {
      provider:         'PostgreSql',
      connectionString: this.defaultConnStr,
      query:            this.defaultRefQuery,
      timeoutSeconds:   300,
    },
    target: {
      provider:         'PostgreSql',
      connectionString: this.defaultConnStr,
      query:            this.defaultTgtQuery,
      timeoutSeconds:   300,
    },
    compare: {
      keyProperties:     ['TradeId', 'Book', 'Desk', 'RiskFactor', 'ValuationDate'],
      compareProperties: [],
    },
    output: {
      diffDb: {
        enabled:          true,
        provider:         'PostgreSql',
        connectionString: this.defaultConnStr,
        tableName:        'NrtDiffResults',
      },
    },
    columnSchema: [...this.defaultColumnSchema.map(c => ({ ...c }))],
  };

  constructor(private nrtApi: NrtApiService, private router: Router) {}

  addColumn(): void {
    this.formData = {
      ...this.formData,
      columnSchema: [...this.formData.columnSchema, { name: '', type: 'string' }],
    };
  }

  removeColumn(index: number): void {
    const updated = [...this.formData.columnSchema];
    updated.splice(index, 1);
    this.formData = { ...this.formData, columnSchema: updated };
  }

  updateColumnName(index: number, name: string): void {
    const updated = this.formData.columnSchema.map((col, i) =>
      i === index ? { ...col, name } : col
    );
    this.formData = { ...this.formData, columnSchema: updated };
  }

  updateColumnType(index: number, type: string): void {
    const updated = this.formData.columnSchema.map((col, i) =>
      i === index ? { ...col, type } : col
    );
    this.formData = { ...this.formData, columnSchema: updated };
  }

  submitRun(): void {
    this.submitting = true;
    this.result     = null;
    this.error      = null;

    this.nrtApi.executeRun(this.formData).subscribe({
      next: (res) => {
        this.result     = res;
        this.submitting = false;
      },
      error: (err) => {
        this.error      = err?.error?.title ?? err?.message ?? 'Run failed. Check API logs.';
        this.submitting = false;
      },
    });
  }

  goToRuns(): void {
    this.router.navigate(['/nrt-runs']);
  }
}
