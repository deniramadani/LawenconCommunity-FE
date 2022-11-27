import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { ContentMemberModule } from "../../layout/content/content.member.module";

import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';

import {TabViewModule} from 'primeng/tabview';
import { PeopleProfileComponent } from "./people.profile.component";
import { PeopleProfileRouting } from "./peaple.profile.routing";
@NgModule({
    declarations: [
  
        PeopleProfileComponent
    ],
    imports: [
        PeopleProfileRouting,TabViewModule,
        CardModule,
        ContentMemberModule,
        AvatarModule,
        BadgeModule,
        ButtonModule,
        TagModule,
        DropdownModule,
        AvatarGroupModule,
        FormsModule,
        CommonModule,
        InfiniteScrollModule,
        ImageModule,
        TooltipModule
    ],
    exports: [
        PeopleProfileComponent
    ]
})
export class PeopleProfileModule { }
