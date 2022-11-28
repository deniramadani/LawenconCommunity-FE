import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MenuItem, SelectItem} from 'primeng/api';
import { BASE_URL } from 'projects/api/BaseUrl';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Subscription } from "rxjs";
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'member-header',
  templateUrl: './header.member.component.html',
})

export class HeaderMemberComponent implements OnInit,OnDestroy {
  private getIdPremiumSubscription? : Subscription
  displayPayment: boolean = false
  photoId: string = String(this.apiService.getProfileFoto())
  fullname : string =String(this.apiService.getProfileName())
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  dataPremium = this.fb.group({
    product: this.fb.group({
      id : ['']
    }),
    file: this.fb.group({
      fileEncode: [''],
      fileExtensions : ['']
    })
  })
  constructor(private fb : FormBuilder,private apiService : ApiService,private router : Router,private productService : ProductsService){}
  ngOnInit(): void {
    
  }
  
  logOut(){
    this.apiService.logout()
    this.router.navigateByUrl('/members/login')
  }
  showFormPayment() {
    this.displayPayment = true;
    this.getIdPremiumSubscription = this.productService.getIdSubcription().subscribe(result => {
      console.log(result);
    })
  }
  
  ngOnDestroy(): void {
    this.getIdPremiumSubscription?.unsubscribe()
  }
  
}