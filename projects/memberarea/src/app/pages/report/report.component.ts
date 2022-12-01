import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html"
})
export class ReportComponent {

    constructor(private router: Router) { }
    clickBack() {
        this.router.navigateByUrl("/my-activity")
    }
}