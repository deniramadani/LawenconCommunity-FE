import { NgModule } from '@angular/core';
import { ContentAdminComponent } from './layout/content/content.admin.component';
import { ContentAdminModule } from './layout/content/content.admin.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';


@NgModule({
  imports: [
    DashboardModule,ContentAdminModule
  ],
  exports : [
    DashboardModule,ContentAdminModule
]
})
export class AdminareaModule { }