import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { DetailArticleComponent } from "./detail.article/detail.article.component"
import { ListArticleComponent } from "./list.article/list.article.component"


const routes : Routes = [
    {
        path: '',
        component : ListArticleComponent
    },
    {
        path: 'detail/:id',
        component : DetailArticleComponent
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