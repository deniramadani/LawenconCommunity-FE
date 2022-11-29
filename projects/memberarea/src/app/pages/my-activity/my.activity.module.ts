import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { ContentMemberModule } from "../../layout/content/content.member.module";
import { MyActivityRouting } from "./my.activity.routing";
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
import { MyActivityComponent } from "./my-activity.component";
import { PanelMenuModule } from 'primeng/panelmenu'
import { TabViewModule } from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import { GalleriaModule } from 'primeng/galleria';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    declarations: [
        MyActivityComponent
    ],
    imports: [
        MyActivityRouting,TabViewModule,GalleriaModule,
        CardModule,PanelMenuModule,ConfirmDialogModule,
        ContentMemberModule,PanelModule,
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
        MyActivityComponent
    ]
})
export class MyActivityModule { }
