import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentAdminComponent } from "projects/adminarea/src/app/layout/content/admin/content.admin.component"
import { ContentMemberComponent } from "projects/memberarea/src/app/layout/content/content.member.component"
import { ViewProfileComponent } from "./view-profile/view-profile.component"

const routes : Routes = [
    {
        path : 'admin',
        component : ContentAdminComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ]
    },
    {
        path : 'super-admin',
        component : ContentAdminComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ]
    },
    {
        path : 'members',
        component : ContentMemberComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ]
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
export class ProfileRouting {}