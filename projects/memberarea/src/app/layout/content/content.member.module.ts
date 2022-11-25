import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FooterComponent } from "../footer/footer.component"
import { HeaderMemberComponent } from "../header/header.member.component"
import { ContentMemberComponent } from "./content.member.component"
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
@NgModule({
  declarations: [
    ContentMemberComponent,FooterComponent,HeaderMemberComponent
  ],
  imports: [
    RouterModule,MenubarModule,ButtonModule,DropdownModule,DialogModule,FileUploadModule
  ],
  exports: [ContentMemberComponent,FooterComponent,HeaderMemberComponent],
 
})
export class ContentMemberModule { }