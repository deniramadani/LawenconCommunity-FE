import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';

@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard.admin.component.html',
})
export class DashboardAdminComponent implements OnInit {
  fullname : string =''
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.fullname = String(this.apiService.getProfileName())
  }

}
