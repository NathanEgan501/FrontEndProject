import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',  // Redirects to 'home' when the app loads
    pathMatch: 'full',
  },
  
  {
    path: 'forecast',
    loadComponent: () => import('./pages/forecast/forecast.page').then((m) => m.ForecastPage),
  },
];
