import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Payment } from 'projects/interface/payment';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../../service/payment.service';

@Component({
  selector: 'app-payment-premium',
  templateUrl: './payment-premium.component.html',

})
export class PaymentPremiumComponent implements OnInit, OnDestroy {

  private getAllPaymentSubscribeSubscription?: Subscription
  private approvePaymentSubscription?: Subscription
  private rejectPaymentSubscription?: Subscription
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  dataPaymentPremium: Payment[] = []
  selectedValues: string[] = []
  dataProduct: any[] = []
  constructor(private paymentService: PaymentService) { }

  onInit(): void {
    this.getAllPaymentSubscribeSubscription = this.paymentService.getAllPaymentSubscribe(0, 10).subscribe(result => {
      console.log(result)
      this.dataPaymentPremium = result
    })
  }
  
  ngOnInit(): void {
    this.onInit()
  }

  approve(id: string){
    this.approvePaymentSubscription = this.paymentService.paymentApprove(id).subscribe(() =>{
      console.log(id)
      this.onInit()
    })
  }

  reject(id: string){
    this.rejectPaymentSubscription = this.paymentService.paymentRejected(id).subscribe(() =>{
      console.log(id);
      this.onInit()
    })
  }

  ngOnDestroy(): void {
    this.getAllPaymentSubscribeSubscription?.unsubscribe()
    this.approvePaymentSubscription?.unsubscribe()
    this.rejectPaymentSubscription?.unsubscribe()
  }

}
