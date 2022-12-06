import { Routes } from '@angular/router';
import { AdminGuard } from 'projects/mainarea/src/app/guard/admin.guard';
import { SuperAdminGuard } from 'projects/mainarea/src/app/guard/super-admin.guard';
import { ContentAdminComponent } from './layout/content/admin/content.admin.component';

export const adminAreaRoutes: Routes = [
  {
    path: 'dashboard',
    component: ContentAdminComponent,
    loadChildren: () => import('../app/pages/dashboard/dashboard.module').then(u => u.DashboardModule)
  },
  {
    path: 'article',
    component: ContentAdminComponent,
    loadChildren: () => import('../app/pages/article/article.module').then(u => u.ArticleModule),
    canLoad: [AdminGuard]
  },

  {
    path: 'master',
    component: ContentAdminComponent,
    loadChildren: () => import('../app/pages/master/master.module').then(u => u.MasterModule),
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'payment',
    component: ContentAdminComponent,
    loadChildren: () => import('../app/pages/payment/payment.module').then(u => u.PaymentModule),
    canLoad: [AdminGuard]
  },
  {
    path: 'report-spa',
    loadChildren: () => import('../app/pages/report/report.module').then(u => u.ReportModule),
    canLoad: [SuperAdminGuard]
  },
];