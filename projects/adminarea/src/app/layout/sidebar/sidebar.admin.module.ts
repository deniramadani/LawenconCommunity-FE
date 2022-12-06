import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { SidebarAdminComponent } from "./admin/sidebar.admin.component"


@NgModule({
  declarations: [
    SidebarAdminComponent
  ],
  imports: [
    RouterModule,CommonModule
  ],
  exports: [SidebarAdminComponent],
 
})
export class SidebarAdminModule { }