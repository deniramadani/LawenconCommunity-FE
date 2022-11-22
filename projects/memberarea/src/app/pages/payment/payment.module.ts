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
import { PaymentComponent } from "./payment.component";
import { PaymentRouting } from "./payment.routing";

@NgModule({
  declarations : [
    PaymentComponent
  ],
  imports : [
      PaymentRouting,
      ContentMemberModule,
      AvatarModule,
      DropdownModule,
      TreeSelectModule,
      InputTextareaModule,
      BreadcrumbModule,
      FileUploadModule,
      HttpClientModule,
      ReactiveFormsModule,
      TagModule,
      CommonModule,ButtonModule

  ],
  exports : [
    PaymentComponent
  ]
})
export class PaymentModule{}