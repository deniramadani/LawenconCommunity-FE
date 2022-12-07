import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs'
import { PostingService } from '../../../service/posting.service';
import { ProductsService } from '../../../service/products.service';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { PaymentService } from 'projects/adminarea/src/app/service/payment.service';
import { PaymentConst } from 'projects/constant/PaymentConst';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})

export class PaymentComponent implements OnInit, OnDestroy {

  private insertPaymentSubscription?: Subscription
  private getProductByIdSubcription?: Subscription
  private getAllByProductIdSubscription?: Subscription

  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  detailProduct: any = new Object
  detailPayment: any = new Object
  idProduct: string = ''
  paymentStatus? : string
  paymentNone : string = PaymentConst.NONE
  paymentRejected : string = PaymentConst.REJECTED

  insertPayment = this.fb.group({
    product: this.fb.group({
      id: ['', [Validators.required]]
    }),
    file: this.fb.group({
      fileEncode: ['', [Validators.required]],
      fileExtensions: ['', [Validators.required]]
    })
  })

  constructor(private productService: ProductsService, private toast: ToastrService, private router: Router, 
    private activedParam: ActivatedRoute, private fb: FormBuilder, private postService: PostingService,
    private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.onInit()
  }

  onInit() {
    this.insertPaymentSubscription = this.activedParam.params.subscribe(id => {
      this.idProduct = String(Object.values(id))
      this.getProductByIdSubcription = this.productService.productGetById(String(Object.values(id))).subscribe(result => {
        this.detailProduct = result
      })
    })
    this.getAllByProductIdSubscription = this.paymentService.getAllByProductId(this.idProduct).subscribe(payment => {
      this.detailPayment = payment
      let paymentStatus
      if(this.detailPayment.length !== 0){
        for (let i = 0; i<= this.detailPayment.length; i++){
          if(this.detailPayment[i].approval == true &&  this.detailPayment[i].isActive == true) {
            paymentStatus = PaymentConst.ACCEPTED
            break
          } else if(this.detailPayment[i].approval == false &&  this.detailPayment[i].isActive == false) {
            paymentStatus = PaymentConst.REJECTED
            break
          } else if(this.detailPayment[i].approval == false &&  this.detailPayment[i].isActive == true) {
            paymentStatus = PaymentConst.PENDING
            break
          } else {
            paymentStatus = PaymentConst.ERROR
          }
        }
      } else {
        paymentStatus = PaymentConst.NONE
      }
      this.paymentStatus = paymentStatus
    })
  }

  payment() {
    this.insertPaymentSubscription = this.postService.paymentProduct(this.insertPayment.value).subscribe(result => {
      this.onInit()
    })
  }

  fileUpload(event: any): void {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      }
      reader.onerror = error => reject(error)
    })
    toBase64(event.target.files[0]).then(result => {
      const resulltStr = result.substring(result.indexOf(",") + 1, result.length)
      const resultExtension = result.split(";")[0].split('/')[1]
      this.insertPayment.patchValue({
        product: {
          id: this.idProduct
        },
        file: {
          fileEncode: resulltStr,
          fileExtensions: resultExtension
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.insertPaymentSubscription?.unsubscribe()
    this.getProductByIdSubcription?.unsubscribe()
    this.getAllByProductIdSubscription?.unsubscribe()
  }

}
