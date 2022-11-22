import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { SidebarAdminComponent } from "./admin/sidebar.admin.component"
import { SidebarSuperAdminComponent } from "./super-admin/sidebar.component"


@NgModule({
  declarations: [
    SidebarAdminComponent,SidebarSuperAdminComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [SidebarAdminComponent,SidebarSuperAdminComponent],
 
})
export class SidebarAdminModule { }