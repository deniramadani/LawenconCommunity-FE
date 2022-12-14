import { NgModule } from "@angular/core";

import { PositionRouting } from "./position.routing";
import {CardModule} from 'primeng/card';
import { InsertPositionComponent } from "./insert-position/insert-position.component";
import { ListPositionComponent } from "./list-position/position.component";
import { UpdatePositionComponent } from "./update-position/update-position.component";
import { TooltipModule } from 'primeng/tooltip'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({

    declarations : [
        InsertPositionComponent,ListPositionComponent,UpdatePositionComponent
    ],
    imports : [
        PositionRouting, CardModule, TooltipModule,
        ButtonModule, TableModule, InputTextModule, ReactiveFormsModule,
        CheckboxModule,ConfirmDialogModule
    ],
    exports : [
        InsertPositionComponent,ListPositionComponent,UpdatePositionComponent
    ]
})
export class PositionModule { }
