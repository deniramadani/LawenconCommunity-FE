import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CanActiveAuth } from "../guard/can-active-auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [CanActiveAuth],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ],
  },
  {
    path: 'members',
    canActivate: [CanActiveAuth],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRouting { }