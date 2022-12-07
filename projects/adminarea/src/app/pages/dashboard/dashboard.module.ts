import { NgModule } from "@angular/core";
import { DashboardRouting } from "./dashboard.routing";
import {CardModule} from 'primeng/card';
import { DashboardAdminComponent } from "./admin/dashboard.admin.component";
import { DashboardSuperAdminComponent } from "./super-admin/dashboard.super.admin.component";
import { ChartModule } from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
    declarations : [
        DashboardAdminComponent,DashboardSuperAdminComponent
    ],
    imports : [
        DashboardRouting,CardModule,ChartModule,ProgressBarModule
    ],
    exports : [
        DashboardAdminComponent,DashboardSuperAdminComponent,ChartModule
    ]
})
export class DashboardModule { }
