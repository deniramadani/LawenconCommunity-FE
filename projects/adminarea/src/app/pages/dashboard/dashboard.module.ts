import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouting } from "./dashboard.routing";
import {CardModule} from 'primeng/card';
import { ContentAdminModule } from "../../layout/content/content.admin.module";

@NgModule({
    declarations : [
        DashboardComponent
    ],
    imports : [
        DashboardRouting,CardModule,ContentAdminModule
    ],
    exports : [
        DashboardComponent
    ]
})
export class DashboardModule { }
