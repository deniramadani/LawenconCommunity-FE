import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerificationCodeComponent } from "./verification-code/verification-code.component";

const routes : Routes = [
  {
    path : '',
    redirectTo : '/members/login',
    pathMatch : 'full'
  },

  {
    path : 'admin',

    children : [
        {  
          path : 'login',
          component : LoginComponent
        },
        {  
          path : 'register',
          component : RegisterComponent
        },
    ]
  },
  {
    path : 'members',

    children : [
        {  
          path : 'login',
          component : LoginComponent
        },
        {  
          path : 'register',
          component : RegisterComponent
        },
    ]
  },

]
@NgModule({
  imports : [
      RouterModule.forChild(routes)
  ],
  exports : [
      RouterModule
  ]
})
export class AuthRouting {}