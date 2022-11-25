import { NgModule } from '@angular/core';
import { ContentMemberModule } from './layout/content/content.member.module';
import { HomeModule } from './pages/home/home.module';
import { ThreadModule } from './pages/thread/thread.module';
import {CardModule} from 'primeng/card';


@NgModule({
  imports: [
    HomeModule,ContentMemberModule,ThreadModule,CardModule
  ],
  exports : [
    HomeModule,ContentMemberModule,ThreadModule,
],
  declarations: [ 
  ]
})
export class MemberAreaModule { }