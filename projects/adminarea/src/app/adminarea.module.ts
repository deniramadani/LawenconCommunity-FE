import { NgModule } from '@angular/core';
import { ContentAdminModule } from './layout/content/content.admin.module';
import { ArticleModule } from './pages/article/article.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MasterModule } from './pages/master/master.module';

@NgModule({
  imports: [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule
  ],
  exports : [
    DashboardModule,ContentAdminModule,ArticleModule,MasterModule
],
  declarations: [

  ]
})
export class AdminareaModule { }