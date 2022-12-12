import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { finalize, Subscription } from 'rxjs'
import { Position } from '../../../../../../../interface/position'
import { ConfirmationService, LazyLoadEvent, PrimeNGConfig } from "primeng/api"
import { DashboardService } from 'projects/adminarea/src/app/service/dashboard.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  providers: [ConfirmationService]
})
export class ListPositionComponent implements OnInit,OnDestroy {
  private pageChangeSubscription? : Subscription
  private getAllSubscription?: Subscription
  private deletePositionSubscription?: Subscription
  private getDataCount?:Subscription
  positionId : string = ''
  dataPosition : Position[] = []
  positions: any[] = []
  page: number = 1
  first = 0
  rows = 10
  limit = this.rows
  totalPosition!: number
  loadertable: boolean =  true
  constructor(private data: DashboardService, private positionServcie: PositionService,
    private confirmationService: ConfirmationService, private title: Title) { 
    this.title.setTitle('Position')
     }
  

  ngOnInit(): void {
    this.onInit()
  }


  onInit() {
    this.getAllSubscription = this.positionServcie.getPosition(this.first, this.limit).pipe(finalize(()=> this.loadertable = false)).subscribe(result => {
      this.dataPosition = []
      for (let i = 0; i < result.length; i++) {
          this.dataPosition.push(result[i])
    }
  
    })
    this.getDataCount = this.data.getData().subscribe(result => {
        this.totalPosition = result.userTotal
    })
  }

  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        key: "positionDialog",
        accept: () => {
          this.deletePositionSubscription = this.positionServcie.deletePosition(id).subscribe(result => {
            this.onInit()
          })
        }
    });
  }

  getData(offset: number, limit: number) {
    this.pageChangeSubscription = this.positionServcie.getPosition(offset, limit).subscribe(result => {
        this.dataPosition = []
        for (let i = 0; i < result.length; i++) {
            this.dataPosition.push(result[i])
        }
    })
  }

  loadData(event: LazyLoadEvent) {
      this.getData(event.first!, event.rows!)
  }
  
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.pageChangeSubscription?.unsubscribe()
    this.getDataCount?.unsubscribe()
    this.deletePositionSubscription?.unsubscribe()
  }

}
