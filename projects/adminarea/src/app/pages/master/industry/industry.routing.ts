import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InsertIndustryComponent } from "./insert-industry/insert-industry.component";
import { ListIndustryComponent } from "./list-industry/list-industry.component";

const routes : Routes = [

    {
        path: '',
        component : ListIndustryComponent 
    },
    {
        path: 'new',
        component : InsertIndustryComponent 
    },
    {
        path: 'industries/:id',
        component : ListIndustryComponent 
    },
   
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class IndustryRouting { }