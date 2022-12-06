import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InsertPositionComponent } from "./insert-position/insert-position.component";
import { ListPositionComponent } from "./list-position/position.component";
import { UpdatePositionComponent } from "./update-position/update-position.component";

const routes : Routes = [

    {
        path: '',
        component : ListPositionComponent
        
    },
    {
        path: 'new',
        component : InsertPositionComponent
        
    },
    {
        path: 'positions/:id',
        component : UpdatePositionComponent
        
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
export class PositionRouting { }