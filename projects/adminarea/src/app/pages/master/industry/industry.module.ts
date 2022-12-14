import { NgModule } from "@angular/core";
import { IndustryRouting } from "./industry.routing";
import { ListIndustryComponent } from "./list-industry/list-industry.component";
import { TooltipModule } from 'primeng/tooltip'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { InsertIndustryComponent } from './insert-industry/insert-industry.component';
import { UpdateIndustryComponent } from './update-industry/update-industry.component'
import { ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
    declarations : [

  
    ListIndustryComponent,
    InsertIndustryComponent,
    UpdateIndustryComponent
  ],
    imports : [
        IndustryRouting, ButtonModule, TableModule,
        InputTextModule, TooltipModule, ReactiveFormsModule,
        CheckboxModule,ConfirmDialogModule
    ],
    exports : [
      
    ]
})
export class IndustriesModule { }
