import { Routes } from '@angular/router';
import { ContentAdminComponent } from './layout/content/content.admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const adminAreaRoutes: Routes = [
  {
    path : '',
    loadChildren : ()=> import('./pages/dashboard/dashboard.module').then(u => u.DashboardModule)
  }
];
