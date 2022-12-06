import { Component, OnDestroy, OnInit } from '@angular/core'
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Schedule } from 'projects/interface/schedule';
import { Subscription } from "rxjs";
import { PostingService } from '../../../service/posting.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',

})
export class ActivitiesComponent implements OnInit,OnDestroy {
  private getEventByUserIdSubscription?: Subscription
  private getCourseByUserIdSubscription?: Subscription
  dataCourse: Schedule[] = []
  dataEvent: Schedule[] = []
  start = 0
  limit = 4
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  seeMore : boolean = false
  constructor(private postService : PostingService) { }
  
  ngOnInit(): void {
    this.getEventByUserIdSubscription = this.postService.getProductEventByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataEvent = result
    })

    this.getCourseByUserIdSubscription = this.postService.getProductCourseByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataCourse = result
    })

  }

  onScroll() {
    this.start += this.limit
  }
  
  ngOnDestroy(): void {
    this.getCourseByUserIdSubscription?.unsubscribe()
    this.getEventByUserIdSubscription?.unsubscribe()
  }
}
