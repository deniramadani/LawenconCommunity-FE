import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ContentAdminComponent } from "projects/adminarea/src/app/layout/content/admin/content.admin.component"
import { ContentMemberComponent } from "projects/memberarea/src/app/layout/content/content.member.component"
import { AdminGuard } from "../guard/admin.guard"
import { MemberGuard } from "../guard/member.guard"
import { SuperAdminGuard } from "../guard/super-admin.guard"
import { ViewProfileComponent } from "./view-profile/view-profile.component"

const routes : Routes = [
    {
        path : 'admin',
        component : ContentAdminComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ],
        canActivate : [AdminGuard]
    },
    {
        path : 'super-admin',
        component : ContentAdminComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ],
        canActivate : [SuperAdminGuard]
    },
    {
        path : 'members',
        component : ContentMemberComponent,
        children : [
            {  path : '', component : ViewProfileComponent},
        ],
        canActivate : [MemberGuard]
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