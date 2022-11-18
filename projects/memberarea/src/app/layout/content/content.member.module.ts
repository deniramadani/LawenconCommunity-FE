import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderMemberComponent } from "../header/header.member.component"
import { ContentMemberComponent } from "./content.member.component"


@NgModule({
  declarations: [
    ContentMemberComponent,FooterComponent,HeaderMemberComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [ContentMemberComponent,FooterComponent,HeaderMemberComponent],
 
})
export class ContentMemberModule { }