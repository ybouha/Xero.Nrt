import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Tab = 'minutes' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

interface DayItem { label: string; value: string; checked: boolean; }

interface CronState {
  tab: Tab;
  minutes: { every: number };
  hourly: { every: number; atMinute: number };
  daily: { mode: 'every' | 'weekday'; everyDays: number; hour: number; minute: number };
  weekly: { days: DayItem[]; hour: number; minute: number };
  monthly: {
    mode: 'day' | 'nth';
    dayOfMonth: number; everyMonths: number;
    ordinal: string; weekday: string;
    hour: number; minute: number;
  };
  yearly: {
    mode: 'date' | 'nth';
    month: number; dayOfMonth: number;
    ordinal: string; weekday: string;
    hour: number; minute: number;
  };
}

const DAY_DEFS = [
  { label: 'Mon', value: 'MON' }, { label: 'Tue', value: 'TUE' },
  { label: 'Wed', value: 'WED' }, { label: 'Thu', value: 'THU' },
  { label: 'Fri', value: 'FRI' }, { label: 'Sat', value: 'SAT' },
  { label: 'Sun', value: 'SUN' },
];

const WEEKDAY_NAMES: Record<string, string> = {
  MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday',
  THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

@Component({
  selector: 'app-cron-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cron-builder.component.html',
  styleUrls: ['./cron-builder.component.scss'],
})
export class CronBuilderComponent implements OnChanges {
  @Input() cronExpression = '0 0 6 * * ?';
  @Output() cronExpressionChange = new EventEmitter<string>();

  readonly tabs: { key: Tab; label: string }[] = [
    { key: 'minutes', label: 'Minutes' },
    { key: 'hourly',  label: 'Hourly'  },
    { key: 'daily',   label: 'Daily'   },
    { key: 'weekly',  label: 'Weekly'  },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly',  label: 'Yearly'  },
  ];

  readonly ordinals = [
    { label: '1st', value: '1' }, { label: '2nd', value: '2' },
    { label: '3rd', value: '3' }, { label: '4th', value: '4' },
    { label: 'Last', value: 'L' },
  ];

  readonly months = MONTH_NAMES.map((label, i) => ({ label, value: i + 1 }));
  readonly weekdays = DAY_DEFS.map(d => ({ label: d.label, value: d.value }));

  state: CronState = this.defaultState();
  preview = '';
  description = '';

  private lastEmitted = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cronExpression']) {
      const val = this.cronExpression;
      if (val && val !== this.lastEmitted) {
        this.tryParse(val);
      }
      this.refreshPreview();
    }
  }

  setTab(tab: Tab): void {
    this.state.tab = tab;
    this.emit();
  }

  emit(): void {
    this.lastEmitted = this.build();
    this.preview = this.lastEmitted;
    this.description = this.describe(this.lastEmitted);
    this.cronExpressionChange.emit(this.lastEmitted);
  }

  private refreshPreview(): void {
    this.preview = this.cronExpression;
    this.description = this.describe(this.cronExpression);
  }

  // ── Build ─────────────────────────────────────────────────────────────────

  private build(): string {
    const s = this.state;
    switch (s.tab) {
      case 'minutes':
        return `0 0/${s.minutes.every || 1} * ? * *`;

      case 'hourly':
        return `0 ${s.hourly.atMinute} 0/${s.hourly.every || 1} ? * *`;

      case 'daily':
        return s.daily.mode === 'weekday'
          ? `0 ${s.daily.minute} ${s.daily.hour} ? * MON-FRI`
          : `0 ${s.daily.minute} ${s.daily.hour} 1/${s.daily.everyDays || 1} * ?`;

      case 'weekly': {
        const checked = s.weekly.days.filter(d => d.checked).map(d => d.value);
        const dow = checked.length ? checked.join(',') : 'MON';
        return `0 ${s.weekly.minute} ${s.weekly.hour} ? * ${dow}`;
      }

      case 'monthly':
        if (s.monthly.mode === 'day') {
          return `0 ${s.monthly.minute} ${s.monthly.hour} ${s.monthly.dayOfMonth} 1/${s.monthly.everyMonths || 1} ?`;
        } else {
          const dow = s.monthly.ordinal === 'L'
            ? `${s.monthly.weekday}L`
            : `${s.monthly.weekday}#${s.monthly.ordinal}`;
          return `0 ${s.monthly.minute} ${s.monthly.hour} ? 1/${s.monthly.everyMonths || 1} ${dow}`;
        }

      case 'yearly':
        if (s.yearly.mode === 'date') {
          return `0 ${s.yearly.minute} ${s.yearly.hour} ${s.yearly.dayOfMonth} ${s.yearly.month} ?`;
        } else {
          const dow = s.yearly.ordinal === 'L'
            ? `${s.yearly.weekday}L`
            : `${s.yearly.weekday}#${s.yearly.ordinal}`;
          return `0 ${s.yearly.minute} ${s.yearly.hour} ? ${s.yearly.month} ${dow}`;
        }
    }
  }

  // ── Describe ──────────────────────────────────────────────────────────────

  private describe(expr: string): string {
    if (!expr?.trim()) return '';
    const parts = expr.trim().split(/\s+/);
    if (parts.length < 6) return '';
    const [, min, hr, dom, mon, dow] = parts;
    const time = `${hr.padStart(2, '0')}:${min.padStart(2, '0')}`;
    const ordName = (o: string) =>
      ({ '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', 'L': 'last' } as Record<string, string>)[o] ?? o;
    const dowLabel = (d: string) => WEEKDAY_NAMES[d] ?? d;

    // Every N minutes
    if (/^0\/\d+$/.test(min) && (hr === '*' || hr === '?')) {
      const n = parseInt(min.split('/')[1]);
      return n === 1 ? 'every minute' : `every ${n} minutes`;
    }

    // Every N hours
    if (/^0\/\d+$/.test(hr)) {
      const n = parseInt(hr.split('/')[1]);
      return `every ${n} hour${n !== 1 ? 's' : ''} at minute ${parseInt(min)}`;
    }

    // Every weekday
    if (dom === '?' && dow === 'MON-FRI') return `every weekday (Mon–Fri) at ${time}`;

    // Every N days
    if (/^1\/\d+$/.test(dom) && mon === '*') {
      const n = parseInt(dom.split('/')[1]);
      return n === 1 ? `every day at ${time}` : `every ${n} days at ${time}`;
    }

    // Every day (simple wildcard form)
    if (dom === '*' && mon === '*' && (dow === '?' || dow === '*')) {
      return `every day at ${time}`;
    }

    // Weekly (comma-separated days)
    if (dom === '?' && mon === '*' && !dow.includes('#') && !dow.endsWith('L') && dow !== '*' && dow !== '?') {
      const labels = dow.split(',').map(d => dowLabel(d));
      return `every ${labels.join(', ')} at ${time}`;
    }

    // Monthly — nth weekday
    if (dom === '?' && /^1\/\d+$/.test(mon) && (dow.includes('#') || dow.endsWith('L'))) {
      const mN = parseInt(mon.split('/')[1]);
      const mStr = mN === 1 ? 'every month' : `every ${mN} months`;
      const dowStr = dow.endsWith('L')
        ? `last ${dowLabel(dow.slice(0, -1))}`
        : (() => { const [wd, o] = dow.split('#'); return `${ordName(o)} ${dowLabel(wd)}`; })();
      return `the ${dowStr} of ${mStr} at ${time}`;
    }

    // Monthly — specific day
    if (/^\d+$/.test(dom) && /^1\/\d+$/.test(mon) && (dow === '?' || dow === '*')) {
      const mN = parseInt(mon.split('/')[1]);
      const mStr = mN === 1 ? 'every month' : `every ${mN} months`;
      return `day ${dom} of ${mStr} at ${time}`;
    }

    // Yearly — specific date
    if (/^\d+$/.test(dom) && /^\d+$/.test(mon) && (dow === '?' || dow === '*')) {
      const mIdx = parseInt(mon) - 1;
      return `${MONTH_NAMES[mIdx] ?? mon} ${dom} every year at ${time}`;
    }

    // Yearly — nth weekday of month
    if (dom === '?' && /^\d+$/.test(mon) && (dow.includes('#') || dow.endsWith('L'))) {
      const mIdx = parseInt(mon) - 1;
      const dowStr = dow.endsWith('L')
        ? `last ${dowLabel(dow.slice(0, -1))}`
        : (() => { const [wd, o] = dow.split('#'); return `${ordName(o)} ${dowLabel(wd)}`; })();
      return `the ${dowStr} of ${MONTH_NAMES[mIdx] ?? mon} every year at ${time}`;
    }

    return expr;
  }

  // ── Parse ─────────────────────────────────────────────────────────────────

  private tryParse(expr: string): void {
    const parts = expr.trim().split(/\s+/);
    if (parts.length < 6) return;
    const [sec, min, hr, dom, mon, dow] = parts;
    if (sec !== '0') return;
    const h = parseInt(hr) || 0;
    const m = parseInt(min) || 0;

    // Every N minutes: 0 0/N * ? * *
    if (/^0\/\d+$/.test(min) && (hr === '*' || hr === '?')) {
      this.state.tab = 'minutes';
      this.state.minutes.every = parseInt(min.split('/')[1]);
      return;
    }

    // Hourly: 0 M 0/N ? * *
    if (/^0\/\d+$/.test(hr) && /^\d+$/.test(min)) {
      this.state.tab = 'hourly';
      this.state.hourly.every = parseInt(hr.split('/')[1]);
      this.state.hourly.atMinute = m;
      return;
    }

    // Every weekday: 0 M H ? * MON-FRI
    if (dom === '?' && dow === 'MON-FRI') {
      this.state.tab = 'daily';
      this.state.daily.mode = 'weekday';
      this.state.daily.hour = h; this.state.daily.minute = m;
      return;
    }

    // Every N days: 0 M H 1/N * ?
    if (/^1\/\d+$/.test(dom) && mon === '*' && (dow === '?' || dow === '*')) {
      this.state.tab = 'daily';
      this.state.daily.mode = 'every';
      this.state.daily.everyDays = parseInt(dom.split('/')[1]);
      this.state.daily.hour = h; this.state.daily.minute = m;
      return;
    }

    // Every day (simple): 0 M H * * ?
    if (dom === '*' && mon === '*' && (dow === '?' || dow === '*')) {
      this.state.tab = 'daily';
      this.state.daily.mode = 'every';
      this.state.daily.everyDays = 1;
      this.state.daily.hour = h; this.state.daily.minute = m;
      return;
    }

    // Weekly: 0 M H ? * DOW,...
    if (dom === '?' && mon === '*' && !dow.includes('#') && !dow.endsWith('L') && dow !== '*' && dow !== '?') {
      this.state.tab = 'weekly';
      this.state.weekly.hour = h; this.state.weekly.minute = m;
      const checked = dow.split(',');
      this.state.weekly.days.forEach(d => (d.checked = checked.includes(d.value)));
      return;
    }

    // Monthly nth: 0 M H ? 1/X DOW#N or DOWL
    if (dom === '?' && /^1\/\d+$/.test(mon) && (dow.includes('#') || dow.endsWith('L'))) {
      this.state.tab = 'monthly';
      this.state.monthly.mode = 'nth';
      this.state.monthly.everyMonths = parseInt(mon.split('/')[1]);
      this.state.monthly.hour = h; this.state.monthly.minute = m;
      if (dow.endsWith('L')) {
        this.state.monthly.weekday = dow.slice(0, -1);
        this.state.monthly.ordinal = 'L';
      } else {
        const [wd, ord] = dow.split('#');
        this.state.monthly.weekday = wd; this.state.monthly.ordinal = ord;
      }
      return;
    }

    // Monthly day: 0 M H D 1/X ?
    if (/^\d+$/.test(dom) && /^1\/\d+$/.test(mon) && (dow === '?' || dow === '*')) {
      this.state.tab = 'monthly';
      this.state.monthly.mode = 'day';
      this.state.monthly.dayOfMonth = parseInt(dom);
      this.state.monthly.everyMonths = parseInt(mon.split('/')[1]);
      this.state.monthly.hour = h; this.state.monthly.minute = m;
      return;
    }

    // Yearly nth: 0 M H ? MON DOW#N or DOWL
    if (dom === '?' && /^\d+$/.test(mon) && (dow.includes('#') || dow.endsWith('L'))) {
      this.state.tab = 'yearly';
      this.state.yearly.mode = 'nth';
      this.state.yearly.month = parseInt(mon);
      this.state.yearly.hour = h; this.state.yearly.minute = m;
      if (dow.endsWith('L')) {
        this.state.yearly.weekday = dow.slice(0, -1);
        this.state.yearly.ordinal = 'L';
      } else {
        const [wd, ord] = dow.split('#');
        this.state.yearly.weekday = wd; this.state.yearly.ordinal = ord;
      }
      return;
    }

    // Yearly date: 0 M H D MON ?
    if (/^\d+$/.test(dom) && /^\d+$/.test(mon) && mon !== '*' && (dow === '?' || dow === '*')) {
      this.state.tab = 'yearly';
      this.state.yearly.mode = 'date';
      this.state.yearly.month = parseInt(mon);
      this.state.yearly.dayOfMonth = parseInt(dom);
      this.state.yearly.hour = h; this.state.yearly.minute = m;
      return;
    }

    // Fallback: daily/every
    this.state.tab = 'daily';
    this.state.daily.mode = 'every';
    this.state.daily.everyDays = 1;
    this.state.daily.hour = h || 6;
    this.state.daily.minute = m;
  }

  // ── Default state ─────────────────────────────────────────────────────────

  private defaultState(): CronState {
    return {
      tab: 'daily',
      minutes: { every: 5 },
      hourly: { every: 1, atMinute: 0 },
      daily: { mode: 'every', everyDays: 1, hour: 6, minute: 0 },
      weekly: {
        days: DAY_DEFS.map((d, i) => ({ ...d, checked: i < 5 })),
        hour: 6, minute: 0,
      },
      monthly: { mode: 'day', dayOfMonth: 1, everyMonths: 1, ordinal: '1', weekday: 'MON', hour: 6, minute: 0 },
      yearly: { mode: 'date', month: 1, dayOfMonth: 1, ordinal: '1', weekday: 'MON', hour: 6, minute: 0 },
    };
  }
}
