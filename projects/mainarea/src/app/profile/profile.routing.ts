import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentAdminComponent } from "projects/adminarea/src/app/layout/content/content.admin.component"
import { ContentMemberComponent } from "projects/memberarea/src/app/layout/content/content.member.component"
import { ChangePasswordComponent } from "./change-password/change-password.component"
import { UpdateProfileComponent } from "./update-profile/update-profile.component"
import { ViewProfileComponent } from "./view-profile/view-profile.component"

const routes : Routes = [
    {
        path : 'admin',
        component : ContentAdminComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
            {  path : 'update-profile', component : UpdateProfileComponent},
            {  path : 'change-password', component : ChangePasswordComponent},
        ]
    },
    {
        path : 'members',
        component : ContentMemberComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
            {  path : 'update-profile', component : UpdateProfileComponent},
            {  path : 'change-password', component : ChangePasswordComponent},
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