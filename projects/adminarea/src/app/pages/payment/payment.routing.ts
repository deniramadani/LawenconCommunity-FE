import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
import { PaymentPremiumComponent } from "./payment-premium/payment-premium.component";
import { PaymentProductComponent } from "./payment-product/payment-product.component";

const routes : Routes = [
    {
        path: 'product',
        component : PaymentProductComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'premium',
        component : PaymentPremiumComponent,
        canActivate: [AdminGuard]
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