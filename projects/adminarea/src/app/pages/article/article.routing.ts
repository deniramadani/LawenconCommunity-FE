import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleComponent } from "./list.article/list.article.component";
import { NewArticleComponent } from "./new.article/new.article.component";
import { UpdateArticleComponent } from "./update-article/update-article.component";

const routes : Routes = [

    {
        path : 'list',
        component : ListArticleComponent
    },
    {
        path : 'new',
        component : NewArticleComponent
    },
    {
        path : 'edit/:id',
        component : UpdateArticleComponent
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
export class ArticleRouting { }