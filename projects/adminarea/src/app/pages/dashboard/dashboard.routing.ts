import { ContentChildren, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentAdminComponent } from "../../layout/content/content.admin.component";
import { ContentModule } from "../../layout/content/content.admin.module";
import { DashboardComponent } from "./dashboard.component";

const routes : Routes = [
    {
        path : '',
        component : DashboardComponent
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule,ContentModule
    ]
})
export class DashboardRouting { }