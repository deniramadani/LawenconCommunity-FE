import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar.admin.component.html',
})
export class SidebarAdminComponent implements OnInit,OnDestroy {
  master = false
  article = false
  dashboardA = false
  dashboardSA = false
  approve = false
  information_report = false
  constructor(private apiService : ApiService) { }
  
  ngOnInit(): void {
    const codeRole = String(this.apiService.getRoleCode())    
    if (codeRole == 'ROLSA') {
      this.dashboardSA = true
      this.master = true
      this.information_report = true
     
    } else if (codeRole == 'ROLAM') {
      this.dashboardA = true
      this.article = true
      this.approve = true
    }


  }

  ngOnDestroy(): void {
    
  }
}
