import { Routes } from '@angular/router';
import { ContentMemberComponent } from './layout/content/content.member.component';
import { PeopleProfileComponent } from './pages/people.profile/people.profile.component';
export const membersAreaRoutes: Routes = [

  {
    path: "home",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/home/home.module").then(d => d.HomeModule)
  },
  {
    path: "thread",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/thread/thread.module").then(d => d.ThreadModule)
  },
  {
    path: "events-courses",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/event-course/event-course.module").then(d => d.EventCourseModule)
  },
  {
    path: "my-activity",
    component : ContentMemberComponent,
    loadChildren: () => import("./pages/my-activity/my.activity.module").then(d => d.MyActivityModule)
  },

  {
    path: 'articles',
    component : ContentMemberComponent,
    loadChildren : () => import('./pages/article/article.module').then(d => d.ArticleModule)
  },

  {
    path: 'report',
    component : ContentMemberComponent,
    loadChildren : () => import('./pages/report/report.module').then(d => d.ReportModule)
  },
  
  {
    path: 'view',
    component : ContentMemberComponent,
    children: [
      {
        path: 'profile/:id',
        component : PeopleProfileComponent
      }
    ]
  }


];