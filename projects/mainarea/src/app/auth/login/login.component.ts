import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription?: Subscription
  dataLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private userService: UsersService, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {

  }

  login() {
    this.loginSubscription = this.userService.login(this.dataLogin.value).subscribe(result => {
      this.apiService.saveData(result)
      if (this.apiService.getRoleCode() == 'ROLSA') {
        this.router.navigateByUrl('/dashboard/super-admin')
      }else if (this.apiService.getRoleCode() == 'ROLMM'){
        this.router.navigateByUrl('/home')
      }else if(this.apiService.getRoleCode() == 'ROLAM'){
        this.router.navigateByUrl('/dashboard/admin')
      }
    })
    
  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }



}