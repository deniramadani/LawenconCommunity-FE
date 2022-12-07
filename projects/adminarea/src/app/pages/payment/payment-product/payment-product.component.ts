import { Component, OnDestroy, OnInit } from '@angular/core';
import { } from '../../../../../../interface/payment'
import { finalize, Subscription } from "rxjs";
import { PaymentService } from '../../../service/payment.service';
import { Payment } from "../../../../../../interface/payment";
import { BASE_URL } from 'projects/constant/BaseUrl';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  
})
export class PaymentProductComponent implements OnInit,OnDestroy {
  private getAllEventCourseSubscription?: Subscription
  private paymentApproveSubscription?: Subscription
  private paymentRejectedSubscription?: Subscription
  loaderButton: boolean = false
  dataPaymentProduct: Payment[] = []
  selectedValues: string[] = [];
  dataProduct: any[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private paymentService : PaymentService) { }
  first = 0
  rows = 10


  ngOnInit(): void {
   this.oninit()
  }

  oninit() {
    this.getAllEventCourseSubscription = this.paymentService.getAllPaymentEventCourse(this.first,60).subscribe(result => {
      this.dataPaymentProduct = result
    })
  }

  approve(id: string) {
    this.loaderButton = true
    this.paymentApproveSubscription = this.paymentService.paymentApprove(id).pipe(finalize(()=>this.loaderButton = false)).subscribe(() => {
      this.oninit()
    })
  }

  reject(id: string) {
    this.loaderButton = true
    this.paymentRejectedSubscription = this.paymentService.paymentRejected(id).pipe(finalize(()=>this.loaderButton = false)).subscribe(() => {
      this.oninit()
    })
  }

  getData(offset: number, limit: number){
   
    this.getAllEventCourseSubscription = this.paymentService.getAllPaymentEventCourse(offset, limit).subscribe(result=>{
        for(let i=0;i<result.length;i++){
            this.dataProduct.push(result[i])
        }
    })
  }

  loadData(event: LazyLoadEvent){
    this.first = event.first!
    this.getData(event.first!, event.rows!)
  }
  ngOnDestroy(): void {
    this.getAllEventCourseSubscription?.unsubscribe()
    this.paymentApproveSubscription?.unsubscribe()
    this.paymentRejectedSubscription?.unsubscribe()
  }
}
