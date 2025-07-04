import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'places',
    loadComponent: () =>
      import('./pages/places/places.page').then((m) => m.PlacesPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'accesses',
    loadComponent: () =>
      import('./pages/accesses/accesses.page').then((m) => m.AccessesPage),
  },
  {
    path: 'alerts',
    loadComponent: () =>
      import('./pages/alerts/alerts.page').then((m) => m.AlertsPage),
  },
];
