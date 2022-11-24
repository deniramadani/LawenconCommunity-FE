import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ListUsersComponent } from "./list-users/list-users.component";
import { InsertUsersComponent } from "./insert-users/insert-users.component";
import { UpdateUsersComponent } from "./update-users/update-users.component";
import { UsersRouting } from "./users.routing";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload'
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import {CalendarModule} from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TreeSelectModule} from 'primeng/treeselect';
@NgModule({

    declarations : [
        ListUsersComponent,InsertUsersComponent,UpdateUsersComponent
    ],
    imports : [
        UsersRouting, CardModule, TooltipModule,
        ButtonModule, TableModule, InputTextModule,
        CommonModule, FormsModule, FileUploadModule, DropdownModule,
        CheckboxModule, ConfirmDialogModule, InputTextareaModule, ImageModule,
        HttpClientModule,ReactiveFormsModule,CalendarModule,TreeSelectModule
    ],
    exports : [
        ListUsersComponent,InsertUsersComponent,UpdateUsersComponent
    ]
})
export class UsersModule { }
