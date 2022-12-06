import { Routes } from '@angular/router';
import { MemberGuard } from 'projects/mainarea/src/app/guard/member.guard';
import { ContentMemberComponent } from './layout/content/content.member.component';
import { PeopleProfileComponent } from './pages/people.profile/people.profile.component';
export const membersAreaRoutes: Routes = [

  {
    path: "home",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/home/home.module").then(d => d.HomeModule),
    canLoad: [MemberGuard]
  },
  {
    path: "thread",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/thread/thread.module").then(d => d.ThreadModule),
    canLoad: [MemberGuard]
  },
  {
    path: "events-courses",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/event-course/event-course.module").then(d => d.EventCourseModule),
    canLoad: [MemberGuard]
  },
  {
    path: "my-activity",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/my-activity/my.activity.module").then(d => d.MyActivityModule),
    canLoad: [MemberGuard]
  },

  {
    path: 'articles',
    component : ContentMemberComponent,
    loadChildren : () => import('./pages/article/article.module').then(d => d.ArticleModule),
    canLoad: [MemberGuard]
  },

  {
    path: 'report',
    component : ContentMemberComponent,
    loadChildren : () => import('./pages/report/report.module').then(d => d.ReportModule),
    canLoad: [MemberGuard]
  },
  
  {
    path: 'view',
    component : ContentMemberComponent,
    children: [
      {
        path: 'profile/:id',
        component : PeopleProfileComponent
      }
    ],
    canActivate: [MemberGuard]
  }


];