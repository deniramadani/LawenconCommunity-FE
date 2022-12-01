import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportRouting } from "./report.routing";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ReportMemberComponent } from "./report-participant/report-participant.component";
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from "primeng/inputtext";
import { ReportComponent } from "./report.component";
import { TabViewModule } from 'primeng/tabview';


@NgModule({
    declarations: [
        ReportIncomeComponent, ReportMemberComponent, ReportComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReportRouting,
        TableModule,
        ConfirmDialogModule,
        CalendarModule,
        BreadcrumbModule,
        ToolbarModule,
        InputTextModule,
        TabViewModule
    ],
    exports: [
        ReportIncomeComponent, ReportMemberComponent, ReportComponent
    ]
})
export class ReportModule { }