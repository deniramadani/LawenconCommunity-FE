import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import { PaymentRouting } from "./payment.routing";
import { PaymentProductComponent } from './payment-product/payment-product.component';
import { PaymentPremiumComponent } from './payment-premium/payment-premium.component';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from "primeng/image";
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from "@angular/common";
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from "@angular/forms";
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations : [
  
    PaymentProductComponent,
       PaymentPremiumComponent
  ],
    imports : [
        PaymentRouting,CommonModule,
        CardModule, InputTextModule,
        TableModule,CheckboxModule,
        ButtonModule,FormsModule,
        ImageModule,DialogModule,
        TabViewModule,
    ],
    exports : [
      
    ]
})
export class PaymentModule { }
