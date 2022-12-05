import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes : Routes = [
    {
        path : '',
        redirectTo : '/members/login',
        pathMatch : 'full'
    },
   
    {
        path : 'positions',
        loadChildren : ()=> import('../master/position/position.module').then(u => u.PositionModule)
    },
    {
        path : 'industries',
        loadChildren : ()=> import('../master/industry/industry.module').then(u => u.IndustriesModule)
    },
    {
        path : 'users',
        loadChildren : ()=> import('../master/users/users.module').then(u => u.UsersModule)
    },
   


]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class MasterRouting { }