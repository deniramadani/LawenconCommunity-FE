import { NgModule } from '@angular/core';
import { LoginComponent } from 'projects/mainarea/src/app/auth/login/login.component';
import { ContentAdminModule } from './layout/content/content.admin.module';
import { ArticleModule } from './pages/article/article.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MasterModule } from './pages/master/master.module';
import { PaymentModule } from './pages/payment/payment.module';
import { ReportModule } from './pages/report/report.module';

@NgModule({
  imports: [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule,PaymentModule,ReportModule
  ],
  exports : [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule,PaymentModule,ReportModule
],
  declarations: [
    
  ]
})
export class AdminareaModule { }