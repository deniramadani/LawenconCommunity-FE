import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { Subscription } from 'rxjs'
import { ArticleService } from '../../service/article.service';
import { Article } from '../../../../../interface/article';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Post } from 'projects/interface/post';
import { PostingService } from '../../service/posting.service';
import { FormBuilder } from '@angular/forms';
import { PostTypeConst } from 'projects/mainarea/src/app/constant/post-type-const';
import { PollingService } from '../../service/polling.service';
import { UserTypeConst } from 'projects/mainarea/src/app/constant/user-type-const';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, OnDestroy {
  private getAllUserSubscription?: Subscription
  private getAllArticleSubscription?: Subscription
  private getAllPostSubscription?: Subscription
  private unlikeSubscription?: Subscription
  private likeSubscription?: Subscription
  private unbookmarkSubscription?: Subscription
  private bookmarkSubscription?: Subscription
  private pollingSubscription?: Subscription

  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  loader = false
  fileid: string = ''
  data: Article[] = []
  posts: Post[] = []
  limit: number = 5
  start: number = 0
  userType: string | null = this.apiService.getUserType()
  fullname: string = ''
  position: string = ''
  email: string = ''
  phoneNumber: string = ''
  age: string = ''
  fotoProfile: string | null = null;
  images: any = []
  seeMore: boolean = false
  verified : boolean = false
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


  constructor(private toast: ToastrService, private pollingService: PollingService, private postService: PostingService, private fb: FormBuilder, private articleService: ArticleService, private router: Router, private apiService: ApiService, private userService: UsersService) { }
  ngOnInit(): void {
   
    this.init();
  }

  init(): void {
    const id = this.apiService.getIdUser()
    this.getAllUserSubscription = this.userService.getUsersById(String(id)).subscribe(result => {
      this.fullname = result.fullname
      this.email = result.email
      this.userType = this.apiService.getUserType()
      if (result.position.positionName != null) {
        this.position = result.position.positionName
      } else {
        this.position = '-'
      }

      if (result.phoneNumber != null) {
        this.phoneNumber = result.phoneNumber
      } else {
        this.phoneNumber = '-'
      }

      if (result.dateOfBirth != null) {
        this.age = `${String(this.getAge(result.dateOfBirth))} tahun`
      } else {
        this.age = '-'
      }
      if (result.photo != null) {
        this.fotoProfile = result.photo.id
      }
      if (result.userType.userTypeCode === 'UTCPM') {
        this.verified = true
      }

    })

    this.getAllArticleSubscription = this.articleService.getArticle(0, 4).subscribe(result => {
      this.data = result
    })
    this.getAllPostSubscription = this.postService.getAll(this.start, this.limit).subscribe(result => {
      this.posts = result
      this.loader = false
    })
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

  premiumPost(id: string) {
    if (this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      this.router.navigateByUrl(`/detail/${id}`)
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
        this.loader = true
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
    this.loader = true
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
  }
}
