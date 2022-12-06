import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "projects/mainarea/src/app/auth/login/login.component";
import { CanActiveAuth } from "projects/mainarea/src/app/guard/can-active-auth.guard";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [CanActiveAuth]
    },
    {
        path: 'positions',
        loadChildren: () => import('../master/position/position.module').then(u => u.PositionModule)
    },
    {
        path: 'industries',
        loadChildren: () => import('../master/industry/industry.module').then(u => u.IndustriesModule)
    },
    {
        path: 'users',
        loadChildren: () => import('../master/users/users.module').then(u => u.UsersModule)
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