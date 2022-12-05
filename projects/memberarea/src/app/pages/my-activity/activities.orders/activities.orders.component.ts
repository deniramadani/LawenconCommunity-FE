import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Payment } from 'projects/interface/payment';
import { Subscription } from "rxjs";
import { PostingService } from '../../../service/posting.service';
@Component({
  selector: 'app-activities-orders',
  templateUrl: './activities.orders.component.html',

})
export class ActivitiesOrdersComponent implements OnInit, OnDestroy {
  private getActivityOrdersSubscription?:Subscription
  dataOrders: Payment[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  seeMore: boolean = false
  start = 0
  limit = 6
  ballance : number = 0
  constructor(private postService : PostingService) { }
  
  ngOnInit(): void {
    this.getActivityOrdersSubscription = this.postService.getActivityOrders(this.start, this.limit).subscribe(result => {
      console.log(result);
      this.dataOrders = result
      this.ballance = this.dataOrders[0].product.ownerId.ballance
    })
  }

  onScroll() {
    this.start += this.limit
  }
  
  ngOnDestroy(): void {
    this.getActivityOrdersSubscription?.unsubscribe()
  }
}
