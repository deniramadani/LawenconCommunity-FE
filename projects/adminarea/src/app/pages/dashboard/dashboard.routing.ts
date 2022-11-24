import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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
        ]
    },

    {
        path : 'super-admin',
        children : [
            {
                path : '',
                component : DashboardSuperAdminComponent
            }
        ]
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