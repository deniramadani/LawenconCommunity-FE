import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Subscription } from "rxjs";
import { ProductsService } from '../../../service/products.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
 
})
export class EventComponent implements OnInit,OnDestroy {
  private getAllSubscription?: Subscription
  limit: number = 6
  start: number = 0
  data: any = new Object
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private productService : ProductsService) { }
  

  ngOnInit(): void {
   this.init()
  }

  init() {
    this.getAllSubscription = this.productService.getAllEvents(this.start, this.limit).subscribe(result => {
      this.data = result
    })
  }

  calculateDiff(sentDate: string) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date();
    var diff: any = Math.floor((date2 - date1) / (1000));
    if (diff < 60) {
      return diff + " seconds ago";
    } else {
      diff = Math.floor(diff / 60)
      if (diff < 60) {
        return diff + " minutes ago";
      } else {
        diff = Math.floor(diff / 60)
        if (diff < 24) {
          return diff + " hours ago";
        } else {
          diff = Math.floor(diff / 24)
          return diff + " days ago"
        }
      }
    }
  }

  onScroll(): void {
    this.addLimit()
    this.init()
  }

  addLimit(): void {
    this.limit += 6
  }


  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
