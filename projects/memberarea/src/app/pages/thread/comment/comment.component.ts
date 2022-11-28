import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Article } from 'projects/interface/article';
import { Post } from 'projects/interface/post';
import { PostTypeConst } from 'projects/mainarea/src/app/constant/post-type-const';
import { UserTypeConst } from 'projects/mainarea/src/app/constant/user-type-const';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../service/article.service';
import { PollingService } from '../../../service/polling.service';
import { PostingService } from '../../../service/posting.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',

})
export class CommentComponent implements OnInit, OnDestroy{
  
  private getAllUserSubscription?: Subscription
  private getAllArticleSubscription?: Subscription
  private getPostByIdSubscription?: Subscription
  private unlikeSubscription?: Subscription
  private likeSubscription?: Subscription
  private pollingSubscription?: Subscription
  features : any[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  fileid: string = ''
  data: Article[] = []
  posts: any = new Object
  limit: number = 5
  start: number = 0
  userType: string | null = this.apiService.getUserType()
  fullname: string = ''
  position: string = ''
  email: string = ''
  phoneNumber: string = ''
  age: string = ''
  fotoProfile: string = ''

  constructor(private activedParam : ActivatedRoute,private toast: ToastrService, private pollingService: PollingService, private postService: PostingService, private fb: FormBuilder, private articleService: ArticleService, private router: Router, private apiService: ApiService, private userService: UsersService) { }
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

      this.fotoProfile = result.photo.id

    })

        this.features = [
          {
            image: 'https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGljb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          },
          {
            image: 'https://images.unsplash.com/photo-1531214159280-079b95d26139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
          },
          {
            image: 'https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          },
        ];

    this.getAllArticleSubscription = this.articleService.getArticle(0, 4).subscribe(result => {
      this.data = result
    })

    this.getPostByIdSubscription = this.activedParam.params.subscribe(id => {
      this.postService.getPostById(String(Object.values(id))).subscribe(result => {
        console.log(result);
        this.posts = result
      })
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
    this.getPostByIdSubscription?.unsubscribe()
    this.unlikeSubscription?.unsubscribe()
    this.likeSubscription?.unsubscribe()
    this.pollingSubscription?.unsubscribe()
  }

}
