import { Component, OnDestroy, OnInit } from '@angular/core';
import { } from '../../../../../../interface/payment'
import { Subscription } from "rxjs";
import { PaymentService } from '../../../service/payment.service';
import { Payment } from "../../../../../../interface/payment";
@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  
})
export class PaymentProductComponent implements OnInit,OnDestroy {
  private getAllEventCourseSubscription?: Subscription
  dataPaymentProduct: Payment[] = []
  selectedValues: string[] = [];
  dataProduct: any[] = []
  constructor(private paymentService : PaymentService) { }
 

  ngOnInit(): void {
    this.getAllEventCourseSubscription = this.paymentService.getAllPaymentEventCourse(0, 10).subscribe(result => {
      console.log(result);
      this.dataPaymentProduct = result
    })
  }
  ngOnDestroy(): void {
   this.getAllEventCourseSubscription?.unsubscribe()
  }
}
