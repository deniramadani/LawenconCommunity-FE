import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { DashboardAdminComponent } from "./admin/dashboard.admin.component";
import { DashboardSuperAdminComponent } from "./super-admin/dashboard.super.admin.component";

const routes : Routes = [
    {
        path : 'admin',
        children : [
            {
                path : '',
                component : DashboardAdminComponent
            }
        ],
        canActivate: [AdminGuard]
    },
    {
        path : 'super-admin',
        children : [
            {
                path : '',
                component : DashboardSuperAdminComponent
            }
        ],
        canActivate: [SuperAdminGuard]
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class DashboardRouting { }