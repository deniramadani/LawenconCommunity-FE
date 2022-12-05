import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
                component: ReportIncomeComponent
            },
            {
                path: "member",
                component: ReportMemberComponent
            }

        ]
    },
    // {
    //     path: "",
    //     component: SuperAdminContentComponent,
    //     children: [
    //         {
    //             path: "member",
    //             component: ReportMemberComponent
    //         }

    //     ]
    // }
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