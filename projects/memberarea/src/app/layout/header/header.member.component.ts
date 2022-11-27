import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, SelectItem} from 'primeng/api';
import { BASE_URL } from 'projects/api/BaseUrl';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
@Component({
  selector: 'member-header',
  templateUrl: './header.member.component.html',
})

export class HeaderMemberComponent implements OnInit {
  displayPayment: boolean = false
 
  photoId: string = String(this.apiService.getProfileFoto())
  fullname : string =String(this.apiService.getProfileName())
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private apiService : ApiService,private router : Router){}
  ngOnInit(): void {
    
  }

  logOut(){
    this.apiService.logout()
    this.router.navigateByUrl('/members/login')
  }
  showFormPayment() {
    this.displayPayment = true;
  }

  
}