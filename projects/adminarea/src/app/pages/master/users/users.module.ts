import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ListUsersComponent } from "./list-users/list-users.component";
import { InsertUsersComponent } from "./insert-users/insert-users.component";
import { UpdateUsersComponent } from "./update-users/update-users.component";
import { UsersRouting } from "./users.routing";
@NgModule({

    declarations : [
        ListUsersComponent,InsertUsersComponent,UpdateUsersComponent
    ],
    imports : [
        UsersRouting,CardModule,TooltipModule,ButtonModule,TableModule,InputTextModule
    ],
    exports : [
        ListUsersComponent,InsertUsersComponent,UpdateUsersComponent
    ]
})
export class UsersModule { }
