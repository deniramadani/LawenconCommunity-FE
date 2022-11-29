import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SelectItem } from 'primeng/api';
import { BASE_URL } from 'projects/api/BaseUrl';
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
  displayPayment: boolean = false
  photoId: string = String(this.apiService.getProfileFoto())
  position: string = String(this.apiService.getPosition())
  fullname: string = String(this.apiService.getProfileName())
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  id: string = ''
  result: string = ''
  premium: boolean = false
  dataPremium = this.fb.group({
    product: this.fb.group({
      id: ['']
    }),
    file: this.fb.group({
      fileEncode: [''],
      fileExtensions: ['']
    })
  })
  constructor(private toast: ToastrService, private fb: FormBuilder, private apiService: ApiService, private router: Router, private productService: ProductsService) { }
  ngOnInit(): void {
    const typeUser = String(this.apiService.getTypeUser())
    console.log(typeUser);

    // if (typeUser == 'UTCBS') {
    //   this.premium = true
    // }
  }

  logOut() {
    this.apiService.logout()
    this.router.navigateByUrl('/members/login')
  }
  showFormPayment() {
    this.displayPayment = true;
    this.getIdPremiumSubscription = this.productService.getIdSubcription().subscribe(result => {
      console.log(result);
      this.id = result.id
    })
  }

  submit() {
    this.insertPaymentPremiumSubscription = this.productService.paymentSubcription(this.dataPremium.value).subscribe(result => {
      this.displayPayment = false
    })
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
      console.log(result);
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
  }

}