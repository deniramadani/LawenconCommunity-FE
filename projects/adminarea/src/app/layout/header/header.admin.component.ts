import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';
import { BASE_URL } from 'projects/constant/BaseUrl';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.admin.component.html',
})
export class HeaderAdminComponent implements OnInit,OnDestroy {
  photoId: string = String(this.apiService.getProfileFoto())
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  fullname: string = String(this.apiService.getProfileName())
  roleCode = (String(this.apiService.getRoleCode()))
  route : string ='super-admin'
  constructor(@Inject(DOCUMENT) private document: Document, private apiService : ApiService,private router : Router) { }
  
  ngOnInit(): void {
    if (this.roleCode === 'ROLAM') {
      this.route = 'admin'
    } 
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
