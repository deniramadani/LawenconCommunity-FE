import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { InsertPositionComponent } from "./insert-position/insert-position.component";
import { ListPositionComponent } from "./list-position/position.component";
import { UpdatePositionComponent } from "./update-position/update-position.component";

const routes : Routes = [
    {
        path: '',
        component : ListPositionComponent,
        canActivate: [SuperAdminGuard]
        
    },
    {
        path: 'new',
        component : InsertPositionComponent,
        canActivate: [SuperAdminGuard]
        
    },
    {
        path: 'positions/:id',
        component : UpdatePositionComponent,
        canActivate: [SuperAdminGuard]
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