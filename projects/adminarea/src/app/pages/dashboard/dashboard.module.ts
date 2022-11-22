import { NgModule } from "@angular/core";

import { DashboardRouting } from "./dashboard.routing";
import {CardModule} from 'primeng/card';
import { ContentAdminModule } from "../../layout/content/content.admin.module";
import { DashboardAdminComponent } from "./admin/dashboard.admin.component";

@NgModule({
    declarations : [
        DashboardAdminComponent
    ],
    imports : [
        DashboardRouting,CardModule
    ],
    exports : [
        DashboardAdminComponent
    ]
})
export class DashboardModule { }
