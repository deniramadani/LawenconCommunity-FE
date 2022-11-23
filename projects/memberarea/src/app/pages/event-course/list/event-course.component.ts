import { Component, OnDestroy, OnInit } from '@angular/core';
import  { Subscription } from 'rxjs'
import { ProductsService } from '../../../service/products.service';
import { Schedule } from '../../../../../../interface/schedule'
import { BASE_URL } from 'projects/api/BaseUrl';

@Component({
  selector: 'app-event-course',
  templateUrl: './event-course.component.html',

})
export class EventCourseComponent implements OnInit,OnDestroy {
  private getAllEventSubscription? : Subscription
  private getAllCourseSubscription? : Subscription
  dataEvent : Schedule[]= []
  dataCourse : Schedule[]= []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private productService : ProductsService) { }
  

  ngOnInit(): void {
    this.getAllEventSubscription = this.productService.getAllEvents(0,3).subscribe(result => {
      this.dataEvent = result      
    })

    this.getAllCourseSubscription = this.productService.getAllCourses(0,3).subscribe(result => {
      this.dataCourse = result      
    })
  }


  ngOnDestroy(): void {
   this.getAllEventSubscription?.unsubscribe()
   this.getAllCourseSubscription?.unsubscribe()
  }
}
