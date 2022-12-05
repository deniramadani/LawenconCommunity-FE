import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
<<<<<<< HEAD
=======
import { LoginComponent } from "projects/mainarea/src/app/auth/login/login.component";
import { CanActiveAuth } from "projects/mainarea/src/app/guard/can-active-auth.guard";
>>>>>>> 99d226cf1bc6bc663d927e2b126afb26e294f0b4

const routes: Routes = [
    {
<<<<<<< HEAD
        path : '',
        redirectTo : '/members/login',
        pathMatch : 'full'
=======
        path: '',
        component: LoginComponent,
        canActivate: [CanActiveAuth]
>>>>>>> 99d226cf1bc6bc663d927e2b126afb26e294f0b4
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