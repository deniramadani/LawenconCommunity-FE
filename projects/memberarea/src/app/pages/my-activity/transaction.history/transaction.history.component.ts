import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Payment } from 'projects/interface/payment';
import { Subscription } from "rxjs";
import { PostingService } from '../../../service/posting.service';
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction.history.component.html',
  
})
export class TransactionHistoryComponent implements OnInit, OnDestroy{
  private getEventCourseBoughtSubscription?:Subscription
  empty: boolean = false
  payments: Payment[] = []
  start = 0
  limit = 6
  seeMore : boolean = true
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private postService : PostingService) { }
 

  ngOnInit(): void {
    this.getEventCourseBoughtSubscription = this.postService.getEventCourseBought(this.start, this.limit).subscribe(result => {
      if (result.length <= 0) {
        this.empty = true
      } else {
        this.payments = result
      }      
      console.log(result);
      
    })
  }

  onScroll() {
    this.start += this.limit
  }

  ngOnDestroy(): void {
    this.getEventCourseBoughtSubscription?.unsubscribe()
  }

}
