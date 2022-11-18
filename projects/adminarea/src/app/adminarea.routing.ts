import { Routes } from '@angular/router';
import { ContentAdminComponent } from './layout/content/content.admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const adminAreaRoutes: Routes = [
  // {
  //   path : 'admin',
  //   component : ContentAdminComponent,
  //   loadChildren : ()=> import('../app/pages/dashboard/dashboard.module').then(u => u.DashboardModule)
  // },
  {
    path : 'admin',
    component : ContentAdminComponent,
    children : [
        {  
          path : 'dashboard',
          component : DashboardComponent
        },
    ]
  },

];