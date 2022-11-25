import { Routes } from '@angular/router';
import { ContentMemberComponent } from './layout/content/content.member.component';
export const membersAreaRoutes: Routes = [

  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
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

];