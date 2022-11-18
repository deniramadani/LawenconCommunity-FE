import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderComponent } from "../header/header.component"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { ContentAdminComponent } from "./content.admin.component"


@NgModule({
  declarations: [
    ContentAdminComponent,FooterComponent,HeaderComponent,SidebarComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [ContentAdminComponent,FooterComponent,HeaderComponent,SidebarComponent],
 
})
export class ContentAdminModule { }