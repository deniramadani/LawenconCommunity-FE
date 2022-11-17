import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

import { Subscription } from "rxjs"
import { UsersService } from '../../service/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  private registerSubscription?: Subscription
  confirmPassword : string = ''
  displayBasic2: boolean = false;
  dataRegister = this.fb.group({
    fullname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    password : ['',[Validators.required]]
  }) 
  constructor(private fb : FormBuilder,private primengConfig: PrimeNGConfig,private userService : UsersService) {}
  

  ngOnInit() {
    this.primengConfig.ripple = true;
    // this.displayBasic2 = true;
  }



  showBasicDialog2() {
    this.registerSubscription = this.userService.generateCode(this.dataRegister).subscribe(result => {
      console.log(result);
       this.displayBasic2 = true;
    })
     
  }
  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }

}
