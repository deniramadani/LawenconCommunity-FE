import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InsertUsersComponent } from "./insert-users/insert-users.component";
import { ListUsersComponent } from "./list-users/list-users.component";
import { UpdateUsersComponent } from "./update-users/update-users.component";

const routes : Routes = [

    {
        path: '',
        component : ListUsersComponent
    },
    {
        path: 'new',
        component : InsertUsersComponent
        
    },
    {
        path: 'users/:id',
        component : UpdateUsersComponent
        
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