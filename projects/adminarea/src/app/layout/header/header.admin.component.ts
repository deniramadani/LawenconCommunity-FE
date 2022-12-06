import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.admin.component.html',
})
export class HeaderAdminComponent implements OnInit,OnDestroy {
  photoId: string = String(this.apiService.getProfileFoto())
  fullname: string = String(this.apiService.getProfileName())
  constructor(@Inject(DOCUMENT) private document: Document, private apiService : ApiService,private router : Router) { }
  
  ngOnInit(): void {
   
  }
  sidebarToggle()
  {
    this.document.body.classList.toggle('toggle-sidebar');
  }
  
  logOut(){
    this.router.navigateByUrl('/admin/login')
    this.apiService.logout()
  }
  ngOnDestroy(): void {
   
  }

  
}
