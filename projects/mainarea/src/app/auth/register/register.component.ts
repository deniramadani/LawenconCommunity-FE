import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';

import { Subscription,finalize} from "rxjs"
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
  loaderButton : boolean = false
  displayBasic2: boolean = false;
  dataRegister = this.fb.group({
    fullname : ['',[Validators.required,Validators.maxLength(50)]],
    email : ['',[Validators.required,Validators.maxLength(40),Validators.email]],
    password : ['',[Validators.required,Validators.maxLength(40)]],
    confirmPassword : ['',[Validators.required,Validators.maxLength(40)]]
  }) 

  dataCode : any = this.fb.group({
    code: new FormControl('', Validators.required),
  })

  constructor(private router: Router, private toast: ToastrService, private fb: FormBuilder,
    private primengConfig: PrimeNGConfig, private userService: UsersService, private title: Title) {
        this.title.setTitle('Register')
     }
 
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  btnGenerateCode() {
    this.loaderButton = true
    if(this.dataRegister.get('password')?.value == this.dataRegister.get('confirmPassword')?.value){
          this.sendVerifiationCodeSubscription = this.userService.generateCode(this.dataRegister.value).pipe(finalize(()=> this.loaderButton = false)).subscribe(result => {
            this.displayBasic2 = true;
            this.loaderButton = false
        })
    }else{
      this.toast.warning('wrong combinate password')
      this.loaderButton = false
    }
  }

  backToLogin(){
    this.router.navigateByUrl('/members/login')
  }

  btnVerificationCode() {
  this.dataCode.addControl('email', this.fb.control(this.dataRegister.get('email')?.value, [Validators.required]));
    this.validateSubscription = this.userService.validateCode(this.dataCode.value).subscribe(result => {
        if(result){
          this.insertDataSubscription = this.userService.register(this.dataRegister.value).pipe(finalize(()=> this.loaderButton =false)).subscribe(result =>{
            this.displayBasic2 = false;
            this.router.navigateByUrl('/members/login')
            this.loaderButton = false
          })
        } 
    })
    this.dataCode.reset()
  }

  ngOnDestroy(): void {
    this.sendVerifiationCodeSubscription?.unsubscribe()
    this.validateSubscription?.unsubscribe()
    this.insertDataSubscription?.unsubscribe()
  }
}


