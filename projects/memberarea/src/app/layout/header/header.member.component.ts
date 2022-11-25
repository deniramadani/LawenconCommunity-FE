import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, SelectItem} from 'primeng/api';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
@Component({
  selector: 'member-header',
  templateUrl: './header.member.component.html',
})

export class HeaderMemberComponent {
  displayPayment : boolean = false
  constructor(private apiService : ApiService,private router : Router){}

  logOut(){
    this.apiService.logout()
    this.router.navigateByUrl('/members/login')
  }
  showFormPayment() {
    this.displayPayment = true;
}
}