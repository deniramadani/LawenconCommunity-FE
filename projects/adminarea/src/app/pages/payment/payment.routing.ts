import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentPremiumComponent } from "./payment-premium/payment-premium.component";
import { PaymentProductComponent } from "./payment-product/payment-product.component";

const routes : Routes = [

    {
        path: 'product',
        component : PaymentProductComponent
    },

    {
        path: 'premium',
        component : PaymentPremiumComponent
    }


]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class PaymentRouting { }