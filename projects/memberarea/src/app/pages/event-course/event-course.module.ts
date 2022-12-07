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
import {AccordionModule} from 'primeng/accordion';
import { EventCourseComponent } from "./list/event-course.component";
import { PaymentComponent } from "./payment/payment.component";
import { DialogModule } from 'primeng/dialog';
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { TableModule } from 'primeng/table'
import { MenuModule } from 'primeng/menu'
import { TabMenuModule } from 'primeng/tabmenu'
import { CalendarModule } from "primeng/calendar";
import { EventComponent } from './event/event.component';
import { CourseComponent } from './course/course.component';
import {BadgeModule} from 'primeng/badge';

@NgModule({
  declarations : [
    EventCourseComponent,PaymentComponent, EventComponent, CourseComponent
  ],
  imports: [
    CardModule,InputTextModule,TableModule,MenuModule,TabMenuModule,CalendarModule,
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
      CommonModule,
      AccordionModule,
      DialogModule,
      BadgeModule
  ],
  exports : [
    EventCourseComponent,PaymentComponent
  ]
})
export class EventCourseModule{}