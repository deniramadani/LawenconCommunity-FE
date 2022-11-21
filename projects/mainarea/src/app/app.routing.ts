import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminareaModule } from "projects/adminarea/src/app/adminarea.module";
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing";
import { ContentAdminComponent } from "projects/adminarea/src/app/layout/content/content.admin.component";
import { ContentMemberComponent } from "projects/memberarea/src/app/layout/content/content.member.component";
import { MemberAreaModule } from "projects/memberarea/src/app/memberarea.module";
import { membersAreaRoutes } from "projects/memberarea/src/app/memberarea.routing";
import { AuthModule } from "./auth/auth.module";
import { PagesError404Component } from "./not-found/pages-error404.component";
import { ProfileModule } from "./profile/profile.module";

export const mainRoutes : Routes = [
    ...adminAreaRoutes,...membersAreaRoutes,
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
        path : 'members',
        component : ContentMemberComponent,
        loadChildren : ()=> import('../../../memberarea/src/app/memberarea.module').then(u => u.MemberAreaModule)
    },
    {
        path : 'login',
        loadChildren : ()=> import('./auth/auth.module').then(u => u.AuthModule)
    },
    {
        path : 'profile',
        loadChildren : ()=> import('./profile/profile.module').then(u => u.ProfileModule)
    },
    {
        path : '**',
        component : PagesError404Component
    }, 

]

@NgModule({
    imports : [
        RouterModule.forRoot(mainRoutes),
        AdminareaModule,AuthModule,MemberAreaModule,ProfileModule
       
    ],
    exports : [
        RouterModule,AuthModule,AdminareaModule,MemberAreaModule,ProfileModule
    ]
})
export class AppRouting { }