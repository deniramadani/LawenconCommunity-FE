import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardAdminComponent } from "./admin/dashboard.admin.component";

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
                component : DashboardAdminComponent
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