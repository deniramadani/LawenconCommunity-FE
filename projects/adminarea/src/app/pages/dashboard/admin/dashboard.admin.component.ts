import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { DashboardService } from '../../../service/dashboard.service';
import { Subscription } from 'rxjs'
import { DashboardAdmin  } from "../../../../../../interface/dashboard-admin";

@Component({
  selector: 'dashboard-admin',
  templateUrl: './dashboard.admin.component.html',
})
export class DashboardAdminComponent implements OnInit,OnDestroy {
  fullname: string = ''
  dataDashboard: any = new Object
  dataMember: any;
  dataPayment: any;
  chartOptions: any;
  chartOptionsPayment : any
  private getDashboardAdminSubscription?: Subscription
  
  constructor(private apiService : ApiService,private dashboardService : DashboardService) { }
 
  ngOnInit(): void {
    this.fullname = String(this.apiService.getProfileName())
    this.getDashboardAdminSubscription = this.dashboardService.getData().subscribe(result => {
      this.dataDashboard = result
        this.dataMember = {
          labels: ['Member Premium','Member Basic'],
          datasets: [
              {
                  data: [result.memberPremiumTotal, result.memberBasicTotal],
              backgroundColor: [
                      "#F49D1A",
                      "#D23369",
                  ],
              hoverBackgroundColor: [
                      "#F49D1A",
                      "#D23369",
                  ]
              }
          ]
      };
      
      this.dataPayment = {
        labels: ['Approve','Rejected','Pending'],
        datasets: [
            {
                data: [result.approvedPaymentTotal, result.rejectedPaymentTotal,result.pendingPaymentTotal],
            backgroundColor: [
                    "#9ED5C5",
                    "#DC3535",
                    "#009EFF",
                ],
            hoverBackgroundColor: [
                    "#9ED5C5",
                    "#DC3535",
                    "#009EFF",
                ]
            }
        ]
      };
    })   

  }

  ngOnDestroy(): void {
   this.getDashboardAdminSubscription?.unsubscribe()
  }


}
