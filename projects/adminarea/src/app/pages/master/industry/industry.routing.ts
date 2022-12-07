import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { InsertIndustryComponent } from "./insert-industry/insert-industry.component";
import { ListIndustryComponent } from "./list-industry/list-industry.component";
import { UpdateIndustryComponent } from "./update-industry/update-industry.component";

const routes: Routes = [

    {
        path: '',
        component: ListIndustryComponent,
        canActivate: [SuperAdminGuard]
    },
    {
        path: 'new',
        component: InsertIndustryComponent,
        canActivate: [SuperAdminGuard]
    },
    {
        path: 'industries/:id',
        component: UpdateIndustryComponent,
        canActivate: [SuperAdminGuard]
    },

]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class IndustryRouting { }