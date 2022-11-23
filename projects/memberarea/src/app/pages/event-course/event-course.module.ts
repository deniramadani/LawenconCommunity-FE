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
import { EventCourseRouting } from "./event-course.routing";

import { EventCourseComponent } from "./list/event-course.component";
import { PaymentComponent } from "./payment/payment.component";
@NgModule({
  declarations : [
    EventCourseComponent,PaymentComponent
  ],
  imports : [
      EventCourseRouting,
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
      CommonModule

  ],
  exports : [
    EventCourseComponent,PaymentComponent
  ]
})
export class EventCourseModule{}