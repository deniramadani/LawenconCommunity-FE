import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PeopleProfileComponent } from "./people.profile.component";


const routes : Routes = [
    {
        path : 'profile/:id',
        component : PeopleProfileComponent
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
export class PeopleProfileRouting { }