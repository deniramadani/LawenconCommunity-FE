
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouting } from "./dashboard.routing";
import {CardModule} from 'primeng/card';
@NgModule({
    declarations : [
        DashboardComponent
    ],
    imports : [
        DashboardRouting,CardModule
    ],
    exports : [
        DashboardComponent
    ]
})
export class DashboardModule { }