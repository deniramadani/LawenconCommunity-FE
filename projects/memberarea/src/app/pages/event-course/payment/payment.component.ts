import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs'
import { PostingService } from '../../../service/posting.service';
import {Schedule} from '../../../../../../interface/schedule'
import { ProductsService } from '../../../service/products.service';
import { BASE_URL } from 'projects/api/BaseUrl';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit,OnDestroy {
  private insertPaymentSubscription?: Subscription
  private getProductByIdSubcription?: Subscription
  detailProduct : any = new Object
  idProduct: string = ''
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  insertPayment = this.fb.group({
    product: this.fb.group({
      id : ['',[Validators.required]]
    }),
    file: this.fb.group({
      fileEncode: ['',[Validators.required]],
      fileExtensions : ['',[Validators.required]]
    })
  })
  constructor(private productService : ProductsService,private toast : ToastrService,private router : Router,private activedParam : ActivatedRoute,private fb : FormBuilder,private postService : PostingService) {}
  
  ngOnInit(): void {
    this.insertPaymentSubscription = this.activedParam.params.subscribe(id => {
      this.idProduct = String(Object.values(id))
      this.getProductByIdSubcription = this.productService.productGetById(String(Object.values(id))).subscribe(result => {
        console.log(result);
        this.detailProduct = result
      })
    })

    
  }

  payment() {
    this.insertPaymentSubscription = this.postService.paymentProduct(this.insertPayment.value).subscribe(result => {
      this.router.navigateByUrl('/events-courses')
    })
  }

  fileUpload(event : any) : void {
    const toBase64 = (file : File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if(typeof reader.result === "string") resolve(reader.result)
     
    }
    reader.onerror = error => reject(error)
})

  toBase64(event.target.files[0]).then(result =>{
      const resulltStr = result.substring(result.indexOf(",")+1,result.length)
      const resultExtension = result.split(";")[0].split('/')[1]
        this.insertPayment.patchValue({
          product: {
            id : this.idProduct
          },
          file: {
            fileEncode: resulltStr,
            fileExtensions : resultExtension
          }
        });
      })
  }
  
  ngOnDestroy(): void {
    this.insertPaymentSubscription?.unsubscribe()
    this.getProductByIdSubcription?.unsubscribe()
  }
}
