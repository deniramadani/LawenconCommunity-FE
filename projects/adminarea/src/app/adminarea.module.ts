import { NgModule } from '@angular/core';
import { ContentAdminModule } from './layout/content/content.admin.module';
import { ArticleModule } from './pages/article/article.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MasterModule } from './pages/master/master.module';
import { PaymentModule } from './pages/payment/payment.module';

@NgModule({
  imports: [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule,PaymentModule
  ],
  exports : [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule,PaymentModule
],
  declarations: [

  ]
})
export class AdminareaModule { }