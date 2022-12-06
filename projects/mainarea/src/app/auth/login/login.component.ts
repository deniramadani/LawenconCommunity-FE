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
  features : any [] = []
  dataLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private userService: UsersService, private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.features = [
      {
        image: 'https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGljb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        title: 'Grow with us',
        text: 'Improve and broaden your horizons'
      },
      {
        image: 'https://images.unsplash.com/photo-1531214159280-079b95d26139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        title: 'Find your relation',
        text: 'Join the dating site where you could meet anyone, anywhere!'
      },
      {
        image: 'https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        title: 'Events & Course',
        text: 'Find interesting events and courses'
      },
  ];

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
