import { NgModule } from "@angular/core"
import { ContentAdminModule } from "projects/adminarea/src/app/layout/content/content.admin.module";
import { ContentMemberModule } from "projects/memberarea/src/app/layout/content/content.member.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileRouting } from "./profile.routing";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { ViewProfileComponent } from './view-profile/view-profile.component'
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {DropdownModule} from 'primeng/dropdown';
import {TreeSelectModule} from 'primeng/treeselect';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  declarations : [
    ViewProfileComponent,UpdateProfileComponent,ChangePasswordComponent
  ],
  imports : [
      ProfileRouting,
      ContentAdminModule,
      ContentMemberModule,
      ButtonModule,
      AvatarModule,
      DropdownModule,
      TreeSelectModule,
      InputTextareaModule,
      ImageModule,
      FileUploadModule,
      HttpClientModule,
      ReactiveFormsModule,
      CalendarModule,ReactiveFormsModule

  ],
  exports : [
    ViewProfileComponent,UpdateProfileComponent,ChangePasswordComponent
  ]
})
export class ProfileModule{}