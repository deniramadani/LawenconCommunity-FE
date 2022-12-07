import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { InsertUsersComponent } from "./insert-users/insert-users.component";
import { ListUsersComponent } from "./list-users/list-users.component";
import { UpdateUsersComponent } from "./update-users/update-users.component";

const routes : Routes = [

    {
        path: '',
        component : ListUsersComponent,
        canActivate: [SuperAdminGuard]
    },
    {
        path: 'new',
        component : InsertUsersComponent,
        canActivate: [SuperAdminGuard]
        
    },
    {
        path: 'users/:id',
        component : UpdateUsersComponent,
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
export class UsersRouting { }