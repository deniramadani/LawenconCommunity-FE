import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Subscription } from "rxjs";
import { DashboardService } from '../../../service/dashboard.service';
@Component({
  selector: 'dashboard-super-admin',
  templateUrl: './dashboard.super.admin.component.html',
})
export class DashboardSuperAdminComponent implements OnInit, OnDestroy {
  private getDataCount?: Subscription
  fullname: string = ''
  data: any;
  dataDashboard : any = new Object()
  valueAdmin: number = 0;
  valueMember: number = 0;
  chartOptions: any;
  constructor(private apiService : ApiService,private dashboardService : DashboardService) { }
  

  ngOnInit(): void {
    this.getDataCount = this.dashboardService.getData().subscribe(result => {
      this.dataDashboard = result
      const countuser = result.adminTotal + result.memberTotal
      const valueadmin = (result.adminTotal / countuser) * 100
      const valuemember = (result.memberTotal / countuser) * 100
      this.valueAdmin = Math.round(valueadmin*10)/10;
      this.valueMember = Math.round(valuemember*10)/10;
      
        this.data = {
          labels: ['Position','Industry','Users'],
          datasets: [
              {
                  data: [result.positionTotal, result.industryTotal, result.userTotal],
              backgroundColor: [
                      "#FFCE56",
                      "#FF6384",
                      "#36A2EB",
                     
                  ],
              hoverBackgroundColor: [
                      "#FFCE56",
                      "#FF6384",
                      "#36A2EB"
                  
                  ]
              }
          ]
      };
    })
   
    this.fullname = String(this.apiService.getProfileName())
  }

  ngOnDestroy(): void {
    this.getDataCount?.unsubscribe()
  }

}
