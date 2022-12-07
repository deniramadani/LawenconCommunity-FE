import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "projects/mainarea/src/app/auth/login/login.component";
import { CanActiveAuth } from "projects/mainarea/src/app/guard/can-active-auth.guard";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [CanActiveAuth]
    },
    {
        path: 'positions',
        loadChildren: () => import('../master/position/position.module').then(u => u.PositionModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'industries',
        loadChildren: () => import('../master/industry/industry.module').then(u => u.IndustriesModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('../master/users/users.module').then(u => u.UsersModule),
        canLoad: [SuperAdminGuard]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class MasterRouting { }