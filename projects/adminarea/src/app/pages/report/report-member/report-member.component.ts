import { Component } from "@angular/core";


@Component({
    selector: "report-member",
    templateUrl: "./report-member.component.html"
})
export class ReportMemberComponent {
    dateRanges : any [] = []
    first = 0
    rows = 10

    reportMember: any = [
        {
            memberName: "Sarah",
            providerName: "Lawencon",
            type: "Event",
            title: "Event 1",
            startDate: "2022/10/12",
            totalParticipants: 90
        },
        {
            memberName: "Sarah",
            providerName: "Lawencon",
            type: "Event",
            title: "Event 1",
            startDate: "2022/10/12",
            totalParticipants: 90
        }
    ]

}