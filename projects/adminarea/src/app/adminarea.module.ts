import { NgModule } from '@angular/core';
import { DashboardModule } from './pages/dashboard/dashboard.module';


@NgModule({
  imports: [
    DashboardModule
  ],
  exports : [
    DashboardModule
]
})
export class AdminareaModule { }
