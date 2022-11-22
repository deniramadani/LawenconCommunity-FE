import { NgModule } from '@angular/core';
import { ContentMemberModule } from './layout/content/content.member.module';
import { HomeModule } from './pages/home/home.module';
import { ThreadModule } from './pages/thread/thread.module';
import {CardModule} from 'primeng/card';
import { PaymentModule } from './pages/payment/payment.module';

@NgModule({
  imports: [
    HomeModule,ContentMemberModule,ThreadModule,CardModule,PaymentModule
  ],
  exports : [
    HomeModule,ContentMemberModule,ThreadModule,PaymentModule
],
  declarations: [ 
  ]
})
export class MemberAreaModule { }