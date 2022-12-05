import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { ContentMemberModule } from "../../layout/content/content.member.module";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GalleriaModule } from 'primeng/galleria';
import { TimeAgoPipe } from "projects/mainarea/src/app/pipe/time-ago.pipe";
import { StyleClassModule } from "primeng/styleclass"
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
    declarations: [
        HomeComponent, TimeAgoPipe
    ],
    imports: [
        HomeRouting,StyleClassModule,InputTextareaModule,HttpClientModule,
        CardModule,DividerModule,ReactiveFormsModule,
        ContentMemberModule,FileUploadModule,
        AvatarModule,CheckboxModule,
        BadgeModule,
        ButtonModule,
        TagModule,
        DropdownModule,
        AvatarGroupModule,
        FormsModule,
        CommonModule,
        InfiniteScrollModule,
        ImageModule,
        TooltipModule,
        ProgressSpinnerModule,
        GalleriaModule,
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }
