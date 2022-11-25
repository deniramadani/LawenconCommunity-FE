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
import {SplitButtonModule} from 'primeng/splitbutton';
@NgModule({
  declarations : [
    CommentComponent,PostingComponent
  ],
  imports : [
      ThreadRouting,TableModule,
      ContentMemberModule,FormsModule,
      ButtonModule,CommonModule,
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