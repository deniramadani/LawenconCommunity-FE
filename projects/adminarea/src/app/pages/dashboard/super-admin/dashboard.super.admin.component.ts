import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';

@Component({
  selector: 'dashboard-super-admin',
  templateUrl: './dashboard.super.admin.component.html',
})
export class DashboardSuperAdminComponent implements OnInit {
  fullname : string =''
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.fullname = String(this.apiService.getProfileName())
  }

}
