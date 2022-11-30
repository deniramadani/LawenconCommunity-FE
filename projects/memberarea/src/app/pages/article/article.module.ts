import { NgModule } from "@angular/core"
import { ContentMemberModule } from "projects/memberarea/src/app/layout/content/content.member.module";
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ArticleRouting } from "./article.routing";
import {AccordionModule} from 'primeng/accordion';

import { DialogModule } from 'primeng/dialog';
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { TabMenuModule } from 'primeng/tabmenu'
import { CalendarModule } from "primeng/calendar";
import { ListArticleComponent } from "./list.article/list.article.component";
import { DetailArticleComponent } from "./detail.article/detail.article.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import {DividerModule} from 'primeng/divider';
@NgModule({
  declarations : [
    ListArticleComponent,DetailArticleComponent
  ],
  imports: [
    CardModule,InputTextModule,TableModule,MenuModule,TabMenuModule,CalendarModule,
      ArticleRouting,DividerModule,
      ContentMemberModule,
      ButtonModule,
      AvatarModule,
      DropdownModule,
      TreeSelectModule,
      InputTextareaModule,
      BreadcrumbModule,
      FileUploadModule,
      HttpClientModule,
      ReactiveFormsModule,
      TagModule,
      CommonModule,
      AccordionModule,
      DialogModule,
      InfiniteScrollModule

  ],
  exports : [
    ListArticleComponent,DetailArticleComponent
  ]
})
export class ArticleModule{}