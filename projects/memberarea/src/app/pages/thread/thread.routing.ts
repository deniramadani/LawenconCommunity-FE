import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { CommentComponent } from "./comment/comment.component"
import { PostingComponent } from "./posting/posting.component"


const routes : Routes = [
    {
        path : '',
        component : PostingComponent
    },
    {
        path : 'aa/:id',
        component : CommentComponent,
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