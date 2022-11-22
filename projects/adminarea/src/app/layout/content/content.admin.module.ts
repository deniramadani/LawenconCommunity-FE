import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderAdminComponent } from "../header/header.admin.component"
import { SidebarAdminComponent } from "../sidebar/admin/sidebar.admin.component"
import { SidebarAdminModule } from "../sidebar/sidebar.admin.module"
import { SidebarSuperAdminComponent } from "../sidebar/super-admin/sidebar.component"
import { ContentAdminComponent } from "./admin/content.admin.component"
import {ContentSuperAdminComponent } from "./super-admin/content.super-admin.component"


@NgModule({
  declarations: [
    ContentAdminComponent,FooterComponent,HeaderAdminComponent,ContentSuperAdminComponent
  ],
  imports: [
    RouterModule,SidebarAdminModule
  ],
  exports: [ContentAdminComponent,FooterComponent,HeaderAdminComponent,ContentSuperAdminComponent],
 
})
export class ContentAdminModule { }