import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/users/components/users-table/users-table.component'
          ).then((m) => m.UsersTableComponent),
      },
    ],
  },
  {
    path: 'recintos',
    loadComponent: () =>
      import('./pages/places/places.page').then((m) => m.PlacesPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/places/components/places-table/places-table.component'
          ).then((m) => m.PlacesTableComponent),
      },
      {
        path: 'modificar/:id',
        loadComponent: () =>
          import('./pages/places/edit-place/edit-place.page').then(
            (m) => m.EditPlacePage
          ),
      },
      {
        path: 'ingresar',
        loadComponent: () =>
          import('./pages/places/create-place/create-place.page').then(
            (m) => m.CreatePlacePage
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'accesos',
    loadComponent: () =>
      import('./pages/accesses/accesses.page').then((m) => m.AccessesPage),
  },
  {
    path: 'alertas',
    loadComponent: () =>
      import('./pages/alerts/alerts.page').then((m) => m.AlertsPage),
  },
  {
    path: 'dispositivos',
    loadComponent: () =>
      import('./pages/devices/devices.page').then((m) => m.DevicesPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/devices/components/devices-table/devices-table.component'
          ).then((m) => m.DevicesTableComponent),
      },
    ],
  },
];
