import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxPopupModule,
  DxButtonModule,
  DxTextBoxModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxLoadIndicatorModule,
} from 'devextreme-angular';
import { Observable } from 'rxjs';
import { NrtApiService } from '../../core/services/nrt-api.service';
import {
  NrtRunDefinitionSummary,
  NrtRunSchedule,
  SaveNrtRunScheduleRequest,
} from '../../core/models/nrt.models';
import { CronBuilderComponent } from '../../shared/cron-builder/cron-builder.component';

/** Local form shape — all string fields are non-optional for DevExtreme two-way binding. */
interface ScheduleForm {
  definitionId: string;
  name: string;
  cronExpression: string;
  timeZone: string;
  valuationDate: string;
  isEnabled: boolean;
}

@Component({
  selector: 'app-run-scheduling',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule, DxPopupModule, DxButtonModule,
    DxTextBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxLoadIndicatorModule,
    CronBuilderComponent,
  ],
  templateUrl: './run-scheduling.component.html',
  styleUrls: ['./run-scheduling.component.scss'],
})
export class RunSchedulingComponent implements OnInit {
  loading = true;
  schedules: NrtRunSchedule[] = [];
  definitions: NrtRunDefinitionSummary[] = [];

  // Create/Edit popup
  formVisible = false;
  editId: string | null = null;
  form: ScheduleForm = this.emptyForm();
  saving = false;
  saveError = '';

  // Delete confirm popup
  deleteVisible = false;
  deleteTarget: NrtRunSchedule | null = null;
  deleting = false;

  constructor(private api: NrtApiService) {}

  ngOnInit(): void {
    this.api.getDefinitions().subscribe(defs => (this.definitions = defs));
    this.loadSchedules();
  }

  private emptyForm(): ScheduleForm {
    return {
      definitionId: '',
      name: '',
      cronExpression: '0 0 6 * * ?',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      valuationDate: '',
      isEnabled: true,
    };
  }

  loadSchedules(): void {
    this.loading = true;
    this.api.getSchedules().subscribe({
      next: items => { this.schedules = items; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  openCreate(): void {
    this.editId = null;
    this.form = this.emptyForm();
    this.saveError = '';
    this.saving = false;
    this.formVisible = true;
  }

  openEdit(s: NrtRunSchedule, event: MouseEvent): void {
    event.stopPropagation();
    this.editId = s.scheduleId;
    this.form = {
      definitionId: s.definitionId,
      name: s.name,
      cronExpression: s.cronExpression,
      timeZone: s.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      valuationDate: s.valuationDate ?? '',
      isEnabled: s.isEnabled,
    };
    this.saveError = '';
    this.saving = false;
    this.formVisible = true;
  }

  confirmSave(): void {
    if (!this.form.definitionId || !this.form.name || !this.form.cronExpression) return;
    this.saving = true;
    this.saveError = '';

    const req: SaveNrtRunScheduleRequest = {
      definitionId: this.form.definitionId,
      name: this.form.name,
      cronExpression: this.form.cronExpression,
      timeZone: this.form.timeZone || undefined,
      valuationDate: this.form.valuationDate || undefined,
      isEnabled: this.form.isEnabled,
    };

    const op: Observable<unknown> = this.editId
      ? this.api.updateSchedule(this.editId, req)
      : this.api.createSchedule(req);

    op.subscribe({
      next: () => { this.formVisible = false; this.loadSchedules(); },
      error: (err: any) => {
        this.saveError = err?.error?.detail ?? err?.error ?? err?.message ?? 'Save failed.';
        this.saving = false;
      },
    });
  }

  toggleEnabled(s: NrtRunSchedule, event: MouseEvent): void {
    event.stopPropagation();
    this.api.setScheduleEnabled(s.scheduleId, !s.isEnabled).subscribe({
      next: () => this.loadSchedules(),
    });
  }

  trigger(s: NrtRunSchedule, event: MouseEvent): void {
    event.stopPropagation();
    this.api.triggerSchedule(s.scheduleId).subscribe();
  }

  openDelete(s: NrtRunSchedule, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteTarget = s;
    this.deleting = false;
    this.deleteVisible = true;
  }

  confirmDelete(): void {
    if (!this.deleteTarget) return;
    this.deleting = true;
    this.api.deleteSchedule(this.deleteTarget.scheduleId).subscribe({
      next: () => { this.deleteVisible = false; this.loadSchedules(); },
      error: () => { this.deleting = false; },
    });
  }
}
