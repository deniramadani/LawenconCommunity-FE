import { NgModule } from "@angular/core"
import { ContentAdminModule } from "projects/adminarea/src/app/layout/content/content.admin.module";
import { ContentMemberModule } from "projects/memberarea/src/app/layout/content/content.member.module";
import { ProfileRouting } from "./profile.routing";
import { ViewProfileComponent } from './view-profile/view-profile.component'
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CalendarModule} from 'primeng/calendar';
import { CommonModule } from "@angular/common";
import { PasswordModule } from "primeng/password"
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations : [
    ViewProfileComponent
  ],
  imports : [
      ProfileRouting,PasswordModule,
      ContentAdminModule,SpeedDialModule,
      ContentMemberModule,FormsModule,
      ButtonModule,
      AvatarModule,
      DropdownModule,
      TreeSelectModule,
      InputTextareaModule,
      ImageModule,
      FileUploadModule,
      HttpClientModule,FormsModule,
      ReactiveFormsModule,CommonModule,
      CalendarModule,ReactiveFormsModule

  ],
  exports : [
    ViewProfileComponent
  ]
})
export class ProfileModule{}