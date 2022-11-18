import { Routes } from '@angular/router';
import { ContentMemberComponent } from './layout/content/content.member.component';
import { HomeComponent } from './pages/home/home.component';

export const membersAreaRoutes: Routes = [
  {
    path : 'members',
    component : ContentMemberComponent,
    children : [
        {  
          path : 'home',
          component : HomeComponent
        },
    ]
  },

];