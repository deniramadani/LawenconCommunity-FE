import { Component, OnInit } from '@angular/core';
import { Industry } from '../../../../../../../interface/industry'
import { Subscription } from 'rxjs'
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
@Component({
  selector: 'app-list-industry',
  templateUrl: './list-industry.component.html',
})
export class ListIndustryComponent implements OnInit {
  private getAllSubscription?: Subscription
  
  dataindustry : Industry[] = []
  industries: any[] = []
  page :number = 1
  constructor(private industryService : IndustryService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.industryService.getIndustry().subscribe(result => {
        this.dataindustry = result
      for (let i = 0; i < result.length; i++) {
         const index = i+1
          this.industries.push({
              no : index,
              id : this.dataindustry[i].id,
              industryName : this.dataindustry[i].industryName,
          })
        }
        console.log(result);
    })
  }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }



}
