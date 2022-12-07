import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
import { ContentAdminComponent } from "../../layout/content/admin/content.admin.component";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { ReportMemberComponent } from "./report-member/report-member.component";

const routes: Routes = [
    {
        path: "",
        component: ContentAdminComponent,
        children: [
            {
                path: "income",
                component: ReportIncomeComponent,
                canActivate: [AdminGuard]
            },
            {
                path: "member",
                component: ReportMemberComponent,
                canActivate: [AdminGuard]
            }

        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ReportRouting { }