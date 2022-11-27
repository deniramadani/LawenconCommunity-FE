import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentMemberComponent } from "../../layout/content/content.member.component";
import { MyActivityComponent } from "./my-activity.component";


const routes : Routes = [
    {
        path : '',
        component : MyActivityComponent
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
export class MyActivityRouting { }