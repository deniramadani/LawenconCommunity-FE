import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportRouting } from "./report.routing";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ReportMemberComponent } from "./report-member/report-member.component";
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ReportIncomeComponent, ReportMemberComponent
    ],
    imports: [
        CommonModule,FormsModule,
        RouterModule,ReactiveFormsModule,
        ReportRouting,
        TableModule,
        ConfirmDialogModule,
        CalendarModule,
        BreadcrumbModule,
        ToolbarModule,
        InputTextModule

    ],
    exports: [
        ReportIncomeComponent, ReportMemberComponent
    ]
})
export class ReportModule { }