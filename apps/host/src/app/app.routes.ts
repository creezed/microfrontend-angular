import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'employees',
    loadChildren: () =>
      import('employees/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'form',
    loadChildren: () => import('form/Module').then((m) => m.RemoteEntryModule),
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/employees', pathMatch: 'full' },
];
