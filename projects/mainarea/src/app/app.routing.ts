import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminareaModule } from "projects/adminarea/src/app/adminarea.module";
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing";
import { MemberAreaModule } from "projects/memberarea/src/app/memberarea.module";
import { membersAreaRoutes } from "projects/memberarea/src/app/memberarea.routing";
import { AuthModule } from "./auth/auth.module";
import { PagesError404Component } from "./not-found/pages-error404.component";
import { ProfileModule } from "./profile/profile.module";

export const mainRoutes: Routes = [
    ...adminAreaRoutes, ...membersAreaRoutes,
    {
        path: '',
        redirectTo: 'members/login',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(u => u.ProfileModule)
    },
    {
        path: '**',
        component: PagesError404Component
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes),
        AdminareaModule, AuthModule, MemberAreaModule, ProfileModule

    ],
    exports: [
        RouterModule, AuthModule, AdminareaModule, MemberAreaModule, ProfileModule
    ]
})
export class AppRouting { }