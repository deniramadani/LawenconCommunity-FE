import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthRouting } from "./auth.routing";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { VerificationCodeComponent } from "./verification-code/verification-code.component";
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations : [
    LoginComponent,RegisterComponent,VerificationCodeComponent
  ],
  imports : [
    AuthRouting,CardModule,ButtonModule,DialogModule,BrowserAnimationsModule,ReactiveFormsModule
  ],
  exports : [
    LoginComponent,RegisterComponent,VerificationCodeComponent
  ]
})
export class AuthModule{}