import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'nrt-runs',
        loadComponent: () =>
          import('./pages/nrt-runs/nrt-runs.component').then(m => m.NrtRunsComponent),
      },
      {
        path: 'diff-results',
        loadComponent: () =>
          import('./pages/diff-results/diff-results.component').then(m => m.DiffResultsComponent),
      },
      {
        path: 'new-run',
        loadComponent: () =>
          import('./pages/new-run/new-run.component').then(m => m.NewRunComponent),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
