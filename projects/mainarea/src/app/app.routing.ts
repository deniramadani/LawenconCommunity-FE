import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminareaModule } from "projects/adminarea/src/app/adminarea.module";
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing";
import { ContentAdminComponent } from "projects/adminarea/src/app/layout/content/content.admin.component";
import { DashboardComponent } from "projects/adminarea/src/app/pages/dashboard/dashboard.component";
import { AuthModule } from "./auth/auth.module";

export const mainRoutes : Routes = [
    ...adminAreaRoutes,
    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
      },
    {
        path : 'admin',
        component : ContentAdminComponent,
        loadChildren : ()=> import('../../../adminarea/src/app/adminarea.module').then(u => u.AdminareaModule)
    },
    {
        path : 'login',
        loadChildren : ()=> import('./auth/auth.module').then(u => u.AuthModule)
    },
]

@NgModule({
    imports : [
        RouterModule.forRoot(mainRoutes),
        AdminareaModule,AuthModule
       
    ],
    exports : [
        RouterModule,AuthModule
    ]
})
export class AppRouting { }