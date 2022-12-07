import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { HomeComponent } from "./home.component";

const routes : Routes = [
    {
        path : '',
        component : HomeComponent,
        canActivate: [MemberGuard]
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
export class HomeRouting { }