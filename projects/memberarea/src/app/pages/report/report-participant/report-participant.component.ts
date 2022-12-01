import { Component } from "@angular/core";


@Component({
    selector: "report-participant",
    templateUrl: "./report-participant.component.html"
})
export class ReportMemberComponent {

    first = 0
    rows = 10

    reportParticipants: any = [
        {
            type: "Event",
            title: "Event 1",
            startDate: "2022/10/12",
            totalParticipants: 90
        },
        {
            type: "Event",
            title: "Event 1",
            startDate: "2022/10/12",
            totalParticipants: 90
        }
    ]

}