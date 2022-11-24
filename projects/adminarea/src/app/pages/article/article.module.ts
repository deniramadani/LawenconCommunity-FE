import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { ArticleRouting } from "./article.routing";
import { ListArticleComponent } from "./list.article/list.article.component";
import { NewArticleComponent } from "./new.article/new.article.component";
import { UpdateArticleComponent } from './update-article/update-article.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload'
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
    declarations : [
        ListArticleComponent,NewArticleComponent, UpdateArticleComponent
    ],
    imports : [
        ArticleRouting,
        CardModule,
        TableModule,
        ButtonModule,
        CommonModule,
        FormsModule,
        InputTextareaModule,
        FileUploadModule,
        ReactiveFormsModule,
        CheckboxModule
    ],
    exports : [
       ListArticleComponent,NewArticleComponent, UpdateArticleComponent
    ]
})
export class ArticleModule { }
