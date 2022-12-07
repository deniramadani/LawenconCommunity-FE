import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
import { ListArticleComponent } from "./list.article/list.article.component";
import { NewArticleComponent } from "./new.article/new.article.component";
import { UpdateArticleComponent } from "./update-article/update-article.component";

const routes : Routes = [
    {
        path : 'list',
        component : ListArticleComponent,
        canActivate: [AdminGuard]
    },
    {
        path : 'new',
        component : NewArticleComponent,
        canActivate: [AdminGuard]
    },
    {
        path : 'edit/:id',
        component : UpdateArticleComponent,
        canActivate: [AdminGuard]
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