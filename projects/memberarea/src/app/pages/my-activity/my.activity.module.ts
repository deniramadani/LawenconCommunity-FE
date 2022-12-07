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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TimeAgoPipe } from "projects/mainarea/src/app/pipe/time-ago.pipe";
import { PostComponent } from './post/post.component';
import { TransactionHistoryComponent } from './transaction.history/transaction.history.component';
import { ActivitiesComponent } from './activities/activities.component';
import { StyleClassModule } from "primeng/styleclass"
import { ActivitiesOrdersComponent } from './activities.orders/activities.orders.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext"
@NgModule({
    declarations: [
        MyActivityComponent,PostComponent, TransactionHistoryComponent, ActivitiesComponent, ActivitiesOrdersComponent
    ],
    imports: [
        MyActivityRouting,TabViewModule,GalleriaModule,StyleClassModule,
        CardModule,PanelMenuModule,ConfirmDialogModule,ReactiveFormsModule,
        ContentMemberModule,PanelModule,DividerModule,InputTextareaModule,
        AvatarModule,SplitButtonModule,MenuModule,DialogModule,InputTextModule,
        BadgeModule,FileUploadModule,CalendarModule,
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
        MyActivityComponent,PostComponent,TransactionHistoryComponent
    ]
})
export class MyActivityModule { }
