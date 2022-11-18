import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import { ContentMemberModule } from "../../layout/content/content.member.module";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
@NgModule({
    declarations : [
        HomeComponent
    ],
    imports : [
        HomeRouting,CardModule,ContentMemberModule,AvatarModule,BadgeModule
    ],
    exports : [
        HomeComponent
    ]
})
export class HomeModule { }
