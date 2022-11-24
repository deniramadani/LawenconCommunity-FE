import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { DashboardService } from '../../../service/dashboard.service';
import { Subscription } from 'rxjs'
import { DashboardAdmin  } from "../../../../../../interface/dashboard-admin";
import { DataCountService } from '../../../service/data.count.service';
@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard.admin.component.html',
})
export class DashboardAdminComponent implements OnInit,OnDestroy {
  fullname: string = ''
  data : any = new Object
  private getDashboardAdminSubscription?: Subscription
  
  constructor(private apiService : ApiService,private dashboardService : DashboardService,private dataCountService : DataCountService) { }
 
  ngOnInit(): void {
    this.fullname = String(this.apiService.getProfileName())
    this.getDashboardAdminSubscription = this.dashboardService.getData().subscribe(result => {
      console.log(result);
      this.data = result
    })   
  }

  ngOnDestroy(): void {
   this.getDashboardAdminSubscription?.unsubscribe()
  }


}
