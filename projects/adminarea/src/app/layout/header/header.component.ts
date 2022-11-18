import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

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
}
