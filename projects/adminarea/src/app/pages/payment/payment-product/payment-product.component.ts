import { Component, OnDestroy, OnInit } from '@angular/core';
import { } from '../../../../../../interface/payment'
import { Subscription } from "rxjs";
import { PaymentService } from '../../../service/payment.service';
@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  
})
export class PaymentProductComponent implements OnInit,OnDestroy {
  private getAllPaymentProductSubscription?: Subscription
  dataPaymentProduct: any = new Object
  selectedValues: string[] = [];
  constructor(private paymentService : PaymentService) { }
 

  ngOnInit(): void {
    this.getAllPaymentProductSubscription = this.paymentService.getAllPaymentProduct(0,100).subscribe(result => {
      this.dataPaymentProduct = result
      
    })
  }
  ngOnDestroy(): void {
   this.getAllPaymentProductSubscription?.unsubscribe()
  }
}
