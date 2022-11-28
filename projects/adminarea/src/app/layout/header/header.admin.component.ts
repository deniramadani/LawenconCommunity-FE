import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';
import { ProductsService } from 'projects/memberarea/src/app/service/products.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-header-admin',
  templateUrl: './header.admin.component.html',
})
export class HeaderAdminComponent implements OnInit,OnDestroy {
  private getIdPremiumSubscription? : Subscription
  constructor(@Inject(DOCUMENT) private document: Document,private productService : ProductsService, private apiService : ApiService,private router : Router) { }
  
  ngOnInit(): void {
    this.getIdPremiumSubscription = this.productService.getIdSubcription().subscribe(result => {
      console.log(result);
    })
  }
  sidebarToggle()
  {
    this.document.body.classList.toggle('toggle-sidebar');
  }
  
  logOut(){
    this.router.navigateByUrl('/admin/login')
    this.apiService.logout()
  }
  ngOnDestroy(): void {
   this.getIdPremiumSubscription?.unsubscribe()
  }
}
