import { NgModule } from "@angular/core";
import { MasterRouting } from "./master.routing";
import {CardModule} from 'primeng/card';
import { PositionModule } from "./position/position.module";
import { ListIndustryComponent } from './industry/list-industry/list-industry.component';
import { IndustriesModule } from "./industry/industry.module";
import { ListUsersComponent } from './users/list-users/list-users.component';
import { UpdateUsersComponent } from './users/update-users/update-users.component';
import { InsertUsersComponent } from './users/insert-users/insert-users.component';
import { UsersModule } from "./users/users.module";


@NgModule({
    declarations : [
  ],
    imports : [
        MasterRouting,CardModule,PositionModule,IndustriesModule,UsersModule
    ],
    exports : [
      
    ]
})
export class MasterModule { }
