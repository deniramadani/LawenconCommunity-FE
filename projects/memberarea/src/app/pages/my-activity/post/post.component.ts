import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Post } from 'projects/interface/post';
import { PostTypeConst } from 'projects/mainarea/src/app/constant/post-type-const';
import { UserTypeConst } from 'projects/mainarea/src/app/constant/user-type-const';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Subscription } from "rxjs";
import { PollingService } from '../../../service/polling.service';
import { PostingService } from '../../../service/posting.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',

})
export class PostComponent implements OnInit,OnDestroy {
  private getAllPostSubscription?: Subscription
  private getPostLikeSubscription?: Subscription
  private getPostBookmarkSubscription?: Subscription
  private unlikeSubscription?: Subscription
  private likeSubscription?: Subscription
  private unbookmarkSubscription?: Subscription
  private bookmarkSubscription?: Subscription
  private pollingSubscription?: Subscription
  private deletePostSubscription?: Subscription
  
  posts : Post[] = []
  postsLike: Post[] = []
  postsBookmark: Post[] = []
  items :  any[] = []
  start = 0
  limit = 6
  id: string = ''
  name: string = ''
  photoId : string = ''
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  userType: string | null = this.apiService.getUserType()
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(private fb : FormBuilder,private pollingService : PollingService,private postService : PostingService,private apiService : ApiService ,private toast : ToastrService) { }
  
  ngOnInit() {
    this.init()
    this.items = [
      {
        label: 'Delete', icon: 'pi pi-trash', command: (event: any) => {
        console.log(event);
      }},
      {label: 'Edit', icon: 'pi pi-pencil'}
      ];
  }

  init() {
    this.getAllPostSubscription = this.postService.getPostByIdUser(this.start,this.limit).subscribe(result => {
      this.posts = result
      this.name = result[0].user.fullname
      this.photoId = result[0].user.photo.id
      
    })
    this.getPostLikeSubscription = this.postService.getPostLikeByIdUser(this.start,this.limit).subscribe(result => {
      this.postsLike = result     
    })

    this.getPostBookmarkSubscription = this.postService.getBookmarkByIdUser(this.start,this.limit).subscribe(result => {
      this.postsBookmark = result     
    })
  }

  onScroll() {
    this.start += this.limit
  }

  tabClick() {
    this.start = 0
    this.init()
  }
  cancelLike(id: string, type: string) {
    if (type == PostTypeConst.PREMIUM && this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      this.unlikeSubscription = this.postService.unlike(id).subscribe(() => {
        this.init()
      })
    }
  }

  like(id: string, type: string) {
    if (type == PostTypeConst.PREMIUM && this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      const postLike = this.fb.group({
        post: {
          id: id
        }
      })

      this.likeSubscription = this.postService.like(postLike.value).subscribe(() => {
        this.init()
      })
    }

  }

  unbookmark(id: string, type: string) {
    if (type == PostTypeConst.PREMIUM && this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      this.unbookmarkSubscription = this.postService.unbookmark(id).subscribe(() => {
        this.init()
      })
    }
  }

  bookmark(id: string, type: string) {
    if (type == PostTypeConst.PREMIUM && this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      const postBookmark = this.fb.group({
        post: {
          id: id
        }
      })

      this.bookmarkSubscription = this.postService.bookmark(postBookmark.value).subscribe(() => {
        this.init()
      })
    }
  }

  choose(id: string) {
    const postPollingResponse = this.fb.group({
      postPollingOption: {
        id: id
      }
    })
    this.pollingSubscription = this.pollingService.polling(postPollingResponse.value).subscribe(() => {
      this.init()
    })
  }
  
  ngOnDestroy(): void {
    this.getAllPostSubscription?.unsubscribe()
    this.getPostBookmarkSubscription?.unsubscribe()
    this.getPostLikeSubscription?.unsubscribe()
  }
}
