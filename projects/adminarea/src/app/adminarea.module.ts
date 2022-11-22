import { NgModule } from '@angular/core';
import { ContentAdminModule } from './layout/content/content.admin.module';
import { ArticleModule } from './pages/article/article.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';

@NgModule({
  imports: [
    DashboardModule,ContentAdminModule,ArticleModule
  ],
  exports : [
    DashboardModule,ContentAdminModule,ArticleModule
],
  declarations: [

  ]
})
export class AdminareaModule { }