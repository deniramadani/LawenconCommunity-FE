import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { Subscription } from 'rxjs'
import { Position } from '../../../../../../../interface/position'

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
})
export class ListPositionComponent implements OnInit,OnDestroy {

  private getAllSubscription?: Subscription
  
  dataPosition : Position[] = []
  positions: any[] = []
  page :number = 1
  constructor(private positionServcie : PositionService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.positionServcie.getPosition().subscribe(result => {
        this.dataPosition = result
      for (let i = 0; i < result.length; i++) {
         const index = i+1
          this.positions.push({
              no : index,
              id : this.dataPosition[i].id,
              positionName : this.dataPosition[i].positionName,
          })
        }
        console.log(result);
    })
  }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
