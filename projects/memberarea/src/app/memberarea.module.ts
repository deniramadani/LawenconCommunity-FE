import { NgModule } from '@angular/core';
import { ContentMemberModule } from './layout/content/content.member.module';
import { HomeModule } from './pages/home/home.module';


@NgModule({
  imports: [
    HomeModule,ContentMemberModule,
  ],
  exports : [
    HomeModule,ContentMemberModule
]
})
export class MemberAreaModule { }