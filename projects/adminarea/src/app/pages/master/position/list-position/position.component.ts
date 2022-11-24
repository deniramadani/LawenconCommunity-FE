import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { Subscription } from 'rxjs'
import { Position } from '../../../../../../../interface/position'
import { ConfirmationService, LazyLoadEvent, PrimeNGConfig } from "primeng/api"
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  providers: [ConfirmationService]
})
export class ListPositionComponent implements OnInit,OnDestroy {

  private getAllSubscription?: Subscription
  private deletePositionSubscription?: Subscription
  positionId : string = ''
  dataPosition : Position[] = []
  positions: any[] = []
  page :number = 1
  constructor(private positionServcie : PositionService,private confirmationService: ConfirmationService) { }
  

  ngOnInit(): void {
    this.onInit()
  }


  onInit() {
    this.getAllSubscription = this.positionServcie.getPosition(0,40).subscribe(result => {
      this.dataPosition = result
      console.log(this.dataPosition.length);
    })
  }

  getAllPosition() {
    
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
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.deletePositionSubscription?.unsubscribe()
  }

}
