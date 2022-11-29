import { NgModule } from '@angular/core';
import { ContentMemberModule } from './layout/content/content.member.module';
import { HomeModule } from './pages/home/home.module';
import { ThreadModule } from './pages/thread/thread.module';
import { CardModule } from 'primeng/card';
import { MyActivityModule } from './pages/my-activity/my.activity.module';
import { PeopleProfileModule } from './pages/people.profile/peaple.profile.module';

@NgModule({
  imports: [
    HomeModule, ContentMemberModule, ThreadModule, CardModule, MyActivityModule, PeopleProfileModule,
  ],
  exports: [
    HomeModule, ContentMemberModule, ThreadModule, MyActivityModule, PeopleProfileModule,
  ],
  declarations: [
  ]
})
export class MemberAreaModule { }