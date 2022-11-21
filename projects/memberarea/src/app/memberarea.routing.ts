import { Routes } from '@angular/router';
import { ContentMemberComponent } from './layout/content/content.member.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentComponent } from './pages/thread/comment/comment.component';
import { PostingComponent } from './pages/thread/posting/posting.component';

export const membersAreaRoutes: Routes = [
  {
    path : 'members',
    component : ContentMemberComponent,
    children : [
        {  
          path : 'home',
          component : HomeComponent
        },
        {  
          path : 'thread',
          component : PostingComponent
        },
        {  
          path : 'thread/:id',
          component : CommentComponent
        },
    ]
  },



];