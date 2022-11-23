import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleComponent } from "./list.article/list.article.component";
import { NewArticleComponent } from "./new.article/new.article.component";

const routes : Routes = [

    // {
    //     path : '',
    //     children : [
    //         {
    //             path : '',
    //             component : ListArticleComponent
    //         },
    //         {
    //             path : 'new',
    //             component : NewArticleComponent
    //         }
    //     ]
    // }

    {
        path : 'list',
        component : ListArticleComponent
    },
    {
        path : 'new',
        component : NewArticleComponent
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