import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderAdminComponent } from "../header/header.admin.component"
import { SidebarAdminModule } from "../sidebar/sidebar.admin.module"
import { ContentAdminComponent } from "./admin/content.admin.component"
import { AvatarModule } from 'primeng/avatar';
@NgModule({
  declarations: [
    ContentAdminComponent,FooterComponent,HeaderAdminComponent
  ],
  imports: [
    RouterModule,SidebarAdminModule,AvatarModule
  ],
  exports: [ContentAdminComponent,FooterComponent,HeaderAdminComponent],
 
})
export class ContentAdminModule { }