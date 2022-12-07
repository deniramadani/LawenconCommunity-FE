import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard"
import { DetailArticleComponent } from "./detail.article/detail.article.component"
import { ListArticleComponent } from "./list.article/list.article.component"


const routes : Routes = [
    {
        path: '',
        component : ListArticleComponent,
        canActivate: [MemberGuard]
    },
    {
        path: 'detail/:id',
        component : DetailArticleComponent,
        canActivate: [MemberGuard]
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
export class ArticleRouting {}