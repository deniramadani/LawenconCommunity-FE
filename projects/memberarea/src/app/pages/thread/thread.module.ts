import { NgModule } from "@angular/core"
import { ContentMemberModule } from "projects/memberarea/src/app/layout/content/content.member.module";
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CommentComponent } from "./comment/comment.component";
import { PostingComponent } from "./posting/posting.component";
import { ThreadRouting } from "./thread.routing";
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {TableModule} from 'primeng/table';
import { CommonModule } from "@angular/common";
import { SplitButtonModule } from 'primeng/splitbutton';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from "primeng/card";
import { BadgeModule } from 'primeng/badge';

import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaModule } from 'primeng/galleria';
@NgModule({
  declarations : [
    CommentComponent,PostingComponent
  ],
  imports : [
      ThreadRouting,TableModule,CarouselModule,BadgeModule,TagModule,CardModule,
      ContentMemberModule,FormsModule,ProgressSpinnerModule,GalleriaModule,
      ButtonModule,CommonModule,ReactiveFormsModule,
      AvatarModule,SplitButtonModule,
      DropdownModule,
      TreeSelectModule,
      InputTextareaModule,
      BreadcrumbModule,
      FileUploadModule,
      HttpClientModule,
      ReactiveFormsModule

  ],
  exports : [
    CommentComponent,PostingComponent
  ]
})
export class ThreadModule{}