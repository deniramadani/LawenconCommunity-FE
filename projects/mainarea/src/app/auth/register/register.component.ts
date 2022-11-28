import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';

import { Subscription } from "rxjs"
import { UsersService } from '../../service/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  private sendVerifiationCodeSubscription?: Subscription
  private validateSubscription?: Subscription
  private insertDataSubscription?: Subscription

  displayBasic2: boolean = false;
  dataRegister = this.fb.group({
    fullname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    password : ['',[Validators.required]],
    confirmPassword : ['',[Validators.required]]
  }) 

  dataCode : any = this.fb.group({
    code: new FormControl('', Validators.required),
  })

  constructor(private router : Router ,private toast : ToastrService,private fb : FormBuilder,private primengConfig: PrimeNGConfig,private userService : UsersService) {}
 
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  btnGenerateCode() {
    if(this.dataRegister.get('password')?.value == this.dataRegister.get('confirmPassword')?.value){
      console.log(this.dataRegister.value);
          this.sendVerifiationCodeSubscription = this.userService.generateCode(this.dataRegister.value).subscribe(result => {
            console.log(result);
            this.displayBasic2 = true;
        })
    }else{
      this.toast.warning('wrong combinate password')
    }
  }

  backToLogin(){
    this.router.navigateByUrl('/members/login')
  }

  btnVerificationCode(){
  this.dataCode.addControl('email', this.fb.control(this.dataRegister.get('email')?.value, [Validators.required]));
    this.validateSubscription = this.userService.validateCode(this.dataCode.value).subscribe(result => {
        if(result){
          this.insertDataSubscription = this.userService.register(this.dataRegister.value).subscribe(result =>{
            this.displayBasic2 = false;
            this.router.navigateByUrl('/members/login')
          })
        }
    })
  }

  ngOnDestroy(): void {
    this.sendVerifiationCodeSubscription?.unsubscribe()
    this.validateSubscription?.unsubscribe()
    this.insertDataSubscription?.unsubscribe()
  }
}


