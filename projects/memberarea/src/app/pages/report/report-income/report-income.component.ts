import { Component } from "@angular/core";

@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html"
})
export class ReportIncomeComponent {

    first = 0
    rows = 10

    reportIncome: any = [
        {
            type: "Event",
            title: "Event1",
            totalIncome: "Rp 90.000"
        },
        {
            type: "Course",
            title: "Course1",
            totalIncome: "Rp. 90.000"
        }
    ]
}