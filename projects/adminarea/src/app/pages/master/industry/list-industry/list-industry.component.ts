import { Component, OnInit } from '@angular/core';
import { Industry } from '../../../../../../../interface/industry'
import { Subscription } from 'rxjs'
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-list-industry',
  templateUrl: './list-industry.component.html',
  providers: [ConfirmationService]
})
export class ListIndustryComponent implements OnInit {
  private getAllSubscription?: Subscription
  private deleteIndustrySubscription? : Subscription
  dataindustry: Industry[] = []
  industryId : string =''
  industries: any[] = []
  page :number = 1
  constructor(private industryService : IndustryService,private confirmationService: ConfirmationService) { }
  

  ngOnInit(): void {
    this.onInit()
  }

  onInit() {
    this.getAllSubscription = this.industryService.getIndustry(0,50).subscribe(result => {
      this.dataindustry = result
  })
  }
  
  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      key: "positionDialog",
      accept: () => {
        this.deleteIndustrySubscription = this.industryService.deleteIndustry(id).subscribe(result => {
          this.onInit()
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.deleteIndustrySubscription?.unsubscribe()
  }



}
