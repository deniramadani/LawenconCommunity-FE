import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard"
import { CommentComponent } from "./comment/comment.component"
import { PostingComponent } from "./posting/posting.component"

const routes : Routes = [
    {
        path : '',
        component : PostingComponent,
        canActivate: [MemberGuard]
    },
    {
        path : 'detail',
        component : PostingComponent,
        canActivate: [MemberGuard]
    },
    {
        path : 'detail/:id',
        component : CommentComponent,
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

export class ThreadRouting {}