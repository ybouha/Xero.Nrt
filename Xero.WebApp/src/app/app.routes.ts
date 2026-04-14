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
        path: 'run-executions',
        loadComponent: () =>
          import('./pages/run-executions/run-executions.component').then(m => m.RunExecutionsComponent),
      },
      {
        path: 'run-definitions',
        loadComponent: () =>
          import('./pages/run-definitions/run-definitions.component').then(m => m.RunDefinitionsComponent),
      },
      {
        path: 'run-definitions/new',
        loadComponent: () =>
          import('./pages/run-definition-form/run-definition-form.component').then(m => m.RunDefinitionFormComponent),
      },
      {
        path: 'run-definitions/:id/edit',
        loadComponent: () =>
          import('./pages/run-definition-form/run-definition-form.component').then(m => m.RunDefinitionFormComponent),
      },
      {
        path: 'diff-results',
        loadComponent: () =>
          import('./pages/diff-results/diff-results.component').then(m => m.DiffResultsComponent),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
