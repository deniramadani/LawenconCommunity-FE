import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Article } from 'projects/interface/article';
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
  private getCommetByIdSubcription?: Subscription
  private insertCommentSubscription?: Subscription
  private updatePostSubscription?: Subscription
  private unbookmarkSubscription?: Subscription
  private bookmarkSubscription?: Subscription
  features : any[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  fileid: string = ''
  data: Article[] = []
  post: any = new Object
  comment : any = new Object
  limit: number = 5
  start: number = 0
  userType: string | null = this.apiService.getUserType()
  fullname: string = ''
  position: string = ''
  email: string = ''
  phoneNumber: string = ''
  age: string = ''
  loader = false
  fotoProfile: string = ''
  seeMoreNoPremium: boolean = false
  seeMore: boolean = false
  formUpdatePost : boolean = false
  idUser: string = String(this.apiService.getIdUser())
  showCommentComponent = {};
  dataComment = this.fb.group({
    content: ['', [Validators.required]],
    post: this.fb.group({
      id : ['']
    })
  })
  updatePost = this.fb.group({
    id : [''],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  })
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

   


    this.getAllArticleSubscription = this.articleService.getArticle(0, 4).subscribe(result => {
      this.data = result
    })

    this.getPostByIdSubscription = this.activedParam.params.subscribe(id => {
      this.postService.getPostById(String(Object.values(id))).subscribe(result => {
        console.log(result);
        this.post = result

        this.features.push({
          image : result.file
        })

        this.dataComment.patchValue({
          post: {
            id : result.id
          }
        })

      })
    })
  
    
    this.getCommetByIdSubcription = this.activedParam.params.subscribe(id => {
      this.postService.getCommentByIdPost(String(Object.values(id))).subscribe(result => {
        this.comment = result
        console.log(result);
      })
    })
  }

  showDialogUpdatePost(id: string,title : string,body: string) {
    this.formUpdatePost = true
    this.updatePost.patchValue({
      id: id,
      title: title,
      body : body
    })
  }
  btnUpdatePost() {
    this.updatePostSubscription = this.postService.updatePost(this.updatePost.value).subscribe(result => {
      this.formUpdatePost = false
      this.init()
    })
  }

  replay() {
    
    this.insertCommentSubscription = this.postService.insertComment(this.dataComment.value).subscribe(() => {
        this.init()
    })
  }

  premiumPost(id: string) {
    if (this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      this.router.navigateByUrl(`/detail/${id}`)
    }
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
    this.getCommetByIdSubcription?.unsubscribe()
    this.insertCommentSubscription?.unsubscribe()
    this.updatePostSubscription?.unsubscribe()
    this.unbookmarkSubscription?.unsubscribe()
    this.bookmarkSubscription?.unsubscribe()
  }

}
