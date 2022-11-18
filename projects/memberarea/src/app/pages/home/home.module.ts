import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import { ContentMemberModule } from "../../layout/content/content.member.module";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";

@NgModule({
    declarations : [
        HomeComponent
    ],
    imports : [
        HomeRouting,CardModule,ContentMemberModule
    ],
    exports : [
        HomeComponent
    ]
})
export class HomeModule { }
