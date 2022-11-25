import { Routes } from '@angular/router';
import { ContentAdminComponent } from './layout/content/admin/content.admin.component';


export const adminAreaRoutes: Routes = [

    {
      path : 'dashboard',
      component : ContentAdminComponent,
      loadChildren : ()=> import('../app/pages/dashboard/dashboard.module').then(u => u.DashboardModule)
    },
    {
      path : 'article',
      component : ContentAdminComponent,
      loadChildren : ()=> import('../app/pages/article/article.module').then(u => u.ArticleModule)
    },
    
    {
      path : 'master',
      component : ContentAdminComponent,
      loadChildren : ()=> import('../app/pages/master/master.module').then(u => u.MasterModule)
  },
    {
      path : 'payment',
      component : ContentAdminComponent,
      loadChildren : ()=> import('../app/pages/payment/payment.module').then(u => u.PaymentModule)
    }
    

];