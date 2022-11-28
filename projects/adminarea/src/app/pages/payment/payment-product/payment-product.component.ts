import { Component, OnDestroy, OnInit } from '@angular/core';
import { } from '../../../../../../interface/payment'
import { Subscription } from "rxjs";
import { PaymentService } from '../../../service/payment.service';
import { Payment } from "../../../../../../interface/payment";
import { BASE_URL } from 'projects/api/BaseUrl';
@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  
})
export class PaymentProductComponent implements OnInit,OnDestroy {
  private getAllEventCourseSubscription?: Subscription
  private paymentApproveSubscription?: Subscription
  private paymentRejectedSubscription?: Subscription
  dataPaymentProduct: Payment[] = []
  selectedValues: string[] = [];
  dataProduct: any[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private paymentService : PaymentService) { }
 

  ngOnInit(): void {
   this.oninit()
  }

  oninit() {
    this.getAllEventCourseSubscription = this.paymentService.getAllPaymentEventCourse(0, 20).subscribe(result => {
      console.log(result);
      this.dataPaymentProduct = result
    })
  }

  approve(id: string) {
    this.paymentApproveSubscription = this.paymentService.paymentApprove(id).subscribe(() => {
      this.oninit()
    })
  }

  rejected(id: string) {
    this.paymentRejectedSubscription = this.paymentService.paymentRejected(id).subscribe(() => {
      this.oninit()
    })
  }

  downloadFile(id: string) {
    
  }
  ngOnDestroy(): void {
    this.getAllEventCourseSubscription?.unsubscribe()
    this.paymentApproveSubscription?.unsubscribe()
    this.paymentRejectedSubscription?.unsubscribe()
  }
}
