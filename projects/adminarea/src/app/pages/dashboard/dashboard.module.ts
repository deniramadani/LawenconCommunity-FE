import { NgModule } from "@angular/core";

import { DashboardRouting } from "./dashboard.routing";
import {CardModule} from 'primeng/card';
import { ContentAdminModule } from "../../layout/content/content.admin.module";
import { DashboardAdminComponent } from "./admin/dashboard.admin.component";
import { DashboardSuperAdminComponent } from "./super-admin/dashboard.super.admin.component";

@NgModule({
    declarations : [
        DashboardAdminComponent,DashboardSuperAdminComponent
    ],
    imports : [
        DashboardRouting,CardModule
    ],
    exports : [
        DashboardAdminComponent,DashboardSuperAdminComponent
    ]
})
export class DashboardModule { }
