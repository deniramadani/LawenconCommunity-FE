import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SelectItem } from 'primeng/api';
import { PaymentService } from 'projects/adminarea/src/app/service/payment.service';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { PaymentConst } from 'projects/constant/PaymentConst';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Subscription } from "rxjs";
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'member-header',
  templateUrl: './header.member.component.html',
})

export class HeaderMemberComponent implements OnInit, OnDestroy {
  private getIdPremiumSubscription?: Subscription
  private insertPaymentPremiumSubscription?: Subscription
  private getAllByProductIdSubscription?: Subscription
  displayPayment: boolean = false
  photoId: string = String(this.apiService.getProfileFoto())
  fullname: string = String(this.apiService.getProfileName())
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  id: string = ''
  result: string = ''
  detailPayment: any[] = []
  premium: string = ''
  fotoProfile: boolean = false
  foto: string = ''
  paymentStatus? : string
  paymentNone : string = PaymentConst.NONE
  paymentRejected : string = PaymentConst.REJECTED
  dataPremium = this.fb.group({
    product: this.fb.group({
      id: ['']
    }),
    file: this.fb.group({
      fileEncode: [''],
      fileExtensions: ['']
    })
  })
  constructor(private paymentService : PaymentService,private toast: ToastrService, private fb: FormBuilder, private apiService: ApiService, private router: Router, private productService: ProductsService) { }
  ngOnInit(): void {
    
    const type = this.apiService.getTypeUser()
    if (type == 'UTCPM') {
      this.premium = 'hidden lg:hidden'
    }
    this.onInit()
  }

  onInit() {
    this.getIdPremiumSubscription = this.productService.getIdSubcription().subscribe(result => {
      this.id = result.id
      this.paymentService.getAllByProductId(result.id).subscribe(result => {
        this.detailPayment = result
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
    })
  }

  logOut() {
    this.apiService.logout()
    this.router.navigateByUrl('/members/login')
  }
  showFormPayment() {
    this.displayPayment = true;
  }
      

  submit() {
    if (this.result == '') {
      this.toast.warning('Please upload proof of payment')
    } else {
      this.insertPaymentPremiumSubscription = this.productService.paymentSubcription(this.dataPremium.value).subscribe(result => {
        this.displayPayment = false
        this.onInit()
      })
    }
  
  }

  fileUpload(event: any): void {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(event.files[0])
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      }
      reader.onerror = error => reject(error)
    })

    toBase64(event.files[0].name).then(result => {
      this.result = result
      this.dataPremium.patchValue({
        product: {
          id: this.id
        },
        file: {
          fileEncode: result.substring(result.indexOf(",") + 1, result.length),
          fileExtensions: result.split(";")[0].split('/')[1]
        }
      });


    })
  }

  ngOnDestroy(): void {
    this.getIdPremiumSubscription?.unsubscribe()
    this.insertPaymentPremiumSubscription?.unsubscribe()
    this.getAllByProductIdSubscription?.unsubscribe()
  }

}