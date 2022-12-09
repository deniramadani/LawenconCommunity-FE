import { Component, OnInit } from '@angular/core';
import { Industry } from '../../../../../../../interface/industry'
import { finalize, Subscription } from 'rxjs'
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DashboardService } from 'projects/adminarea/src/app/service/dashboard.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-industry',
  templateUrl: './list-industry.component.html',
  providers: [ConfirmationService]
})
export class ListIndustryComponent implements OnInit {
  private getAllSubscription?: Subscription
  private deleteIndustrySubscription?: Subscription
  private pageChangeSubscription?: Subscription
  private getDataCount?:Subscription
  dataindustry: Industry[] = []
  loaderTable: boolean = true
  industryId : string =''
  industries: any[] = []
  page: number = 1
  first = 0
  rows = 10
  limit = this.rows
  totalindustry!: number
  constructor(private data: DashboardService, private industryService: IndustryService,
    private confirmationService: ConfirmationService, private title: Title) {
      this.title.setTitle('Industry')
     }
  

  ngOnInit(): void {
    this.onInit()
  }

  onInit() {
    this.getAllSubscription = this.industryService.getIndustry(this.first, this.limit).pipe(finalize(()=>this.loaderTable = false)).subscribe(result => {
      this.dataindustry = []
      for (let i = 0; i < result.length; i++) {
          this.dataindustry.push(result[i])
    }
  
    })
    this.getDataCount = this.data.getData().subscribe(result => {
        this.totalindustry = result.userTotal
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

  getData(offset: number, limit: number) {
    this.pageChangeSubscription = this.industryService.getIndustry(offset, limit).subscribe(result => {
        this.dataindustry = []
        for (let i = 0; i < result.length; i++) {
            this.dataindustry.push(result[i])
        }
    })
  }

  loadData(event: LazyLoadEvent) {
      this.getData(event.first!, event.rows!)
  }

  ngOnDestroy(): void {
    this.pageChangeSubscription?.unsubscribe()
    this.getDataCount?.unsubscribe()
    this.getAllSubscription?.unsubscribe()
    this.deleteIndustrySubscription?.unsubscribe()
  }



}
