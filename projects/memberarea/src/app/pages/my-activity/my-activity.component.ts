import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Article } from 'projects/interface/article';
import { Payment } from 'projects/interface/payment';
import { Schedule } from 'projects/interface/schedule';
import { PostTypeConst } from 'projects/mainarea/src/app/constant/post-type-const';
import { UserTypeConst } from 'projects/mainarea/src/app/constant/user-type-const';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { Subscription } from 'rxjs';
import { Post } from '../../../../..//interface/post';
import { ArticleService } from '../../service/article.service';
import { PollingService } from '../../service/polling.service';
import { PostingService } from '../../service/posting.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  providers: [ConfirmationService]
})
export class MyActivityComponent implements OnInit,OnDestroy {
  private getAllUserSubscription?: Subscription
  private getAllArticleSubscription?: Subscription
  private getAllPostSubscription?: Subscription
  private unlikeSubscription?: Subscription
  private likeSubscription?: Subscription
  private unbookmarkSubscription?: Subscription
  private bookmarkSubscription?: Subscription
  private pollingSubscription?: Subscription
  private getPostLikeSubscription?: Subscription
  private getPostBookmarkSubscription?: Subscription
  private deletePostSubscription?: Subscription
  private getEventByUserIdSubscription?: Subscription
  private getCourseByUserIdSubscription?: Subscription
  private getEventCourseBoughtSubscription?: Subscription
  private getActivityOrdersSubscription?: Subscription

  items: any[] = []
  items1 : any[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  fileid: string = ''
  data: Article[] = []
  posts: Post[] = []
  postsLike: Post[] = []
  postsBookmark: Post[] = []
  dataEvent: Schedule[] = []
  dataCourse: Schedule[] = []
  payments: Payment[] = []
  dataOrders : Payment[] = []
  limit: number = 5
  start: number = 0
  title: string = ''
  icon: string = ''
  seeMore : boolean =false
  userType: string | null = this.apiService.getUserType()
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
  posting: boolean = true
  product: boolean = false
  on_going: boolean = false
  empty: boolean = false
  orders : boolean = false
  postId: string = ''
  id : string = ''
  constructor(private confirmationService: ConfirmationService,private toast: ToastrService, private pollingService: PollingService, private postService: PostingService, private fb: FormBuilder, private articleService: ArticleService, private router: Router, private apiService: ApiService, private userService: UsersService) { }
  ngOnInit(): void {
    this.init();
    this.items = [
      {label: 'Income', icon: 'pi pi-euro', routerLink: ['/report/income']},
      {separator: true},
      {label: 'Participant', icon: 'pi pi-users', routerLink: ['/report/participants']}
    ];
    this.items1 = [
      {
        label: 'Delete', icon: 'pi pi-trash', command: (event: any) => {
        console.log(event);
      }},
      {label: 'Edit', icon: 'pi pi-pencil'}
      ];
    
  }

  cetak() {
    console.log('cetak');
  }

  init(): void {
   
    this.getAllPostSubscription = this.postService.getPostByIdUser(this.start,this.limit).subscribe(result => {
      this.posts = result
    })
    this.getPostLikeSubscription = this.postService.getPostLikeByIdUser(this.start,this.limit).subscribe(result => {
      this.postsLike = result     
    })

    this.getPostBookmarkSubscription = this.postService.getBookmarkByIdUser(this.start,this.limit).subscribe(result => {
      this.postsBookmark = result     
    })

  }

  showPost() {
    this.posting = true
    this.product = false
    this.on_going = false
    this.orders = false
    this.init()
    
  }

  showMyActivity() {
    this.product = true
    this.posting = false
    this.on_going = false
    this.orders = false
    this.title = 'My Activities'
    this.icon = 'bi bi-pencil-square'

    this.getEventByUserIdSubscription = this.postService.getProductEventByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataEvent = result
    })

    this.getCourseByUserIdSubscription = this.postService.getProductCourseByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataCourse = result
    })

  }

  showOrders() {
    this.product = false
    this.posting = false
    this.on_going = false
    this.orders = true
    this.getActivityOrdersSubscription = this.postService.getActivityOrders(this.start, this.limit).subscribe(result => {
      console.log(result);
      this.dataOrders = result
    })
  }

  showOnGoing() {
    this.product = false
    this.posting = false
    this.on_going = true
    this.orders = false
    this.title = 'Trasaction History'
    this.icon = 'bi bi-hourglass-split'
    this.getEventCourseBoughtSubscription = this.postService.getEventCourseBought(this.start, this.limit).subscribe(result => {
      if (result.length <= 0) {
        this.empty = true
      } else {
        this.payments = result
      }
      console.log(result);
      
    })
   
  }

  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
        message: 'Do you want to delete post?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        key: "positionDialog",
        accept: () => {
          this.deletePostSubscription = this.postService.deletePost(id).subscribe(result => {
            this.init()
          })
        }
    });
  }

  


  calculateDiff(sentDate: string) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date();
    var diff: any = Math.floor((date2 - date1) / (1000));
    if (diff < 60) {
      return diff + " seconds ago";
    } else {
      diff = Math.floor(diff / 60)
      if (diff < 60) {
        return diff + " minutes ago";
      } else {
        diff = Math.floor(diff / 60)
        if (diff < 24) {
          return diff + " hours ago";
        } else {
          diff = Math.floor(diff / 24)
          return diff + " days ago"
        }
      }
    }
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
  getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  onScroll(): void {
    this.addLimit()
    this.init()
  }

  addLimit(): void {
    this.limit += 5
  }


  createNewThread() {
    this.router.navigateByUrl('/thread')
  }

  ngOnDestroy(): void {
    this.getAllUserSubscription?.unsubscribe()
    this.getAllArticleSubscription?.unsubscribe()
    this.getAllPostSubscription?.unsubscribe()
    this.unlikeSubscription?.unsubscribe()
    this.likeSubscription?.unsubscribe()
    this.unbookmarkSubscription?.unsubscribe()
    this.bookmarkSubscription?.unsubscribe()
    this.pollingSubscription?.unsubscribe()
    this.getPostLikeSubscription?.unsubscribe()
    this.getPostBookmarkSubscription?.unsubscribe()
    this.deletePostSubscription?.unsubscribe()
    this.getEventByUserIdSubscription?.unsubscribe()
    this.getCourseByUserIdSubscription?.unsubscribe()
    this.getEventCourseBoughtSubscription?.unsubscribe()
  }
}
