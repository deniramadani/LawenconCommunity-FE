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
import { FormArray, FormBuilder,Validators } from '@angular/forms';
import { PostTypeConst } from 'projects/mainarea/src/app/constant/post-type-const';
import { PollingService } from '../../service/polling.service';
import { UserTypeConst } from 'projects/mainarea/src/app/constant/user-type-const';
import { ToastrService } from 'ngx-toastr';
import { AutoFocus } from 'primeng/autofocus';
import { FileService } from '../../service/file.service';

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
  private getCommetByIdSubcription?: Subscription
  private insertCommentSubscription?: Subscription
  private insertPostBasicSubscription?: Subscription

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
  idUser: string = ''
  seeMore: boolean = false
  seeMoreNoPremium : boolean =false
  fotoProfile: string | null = null;
  images: any = []
  verified: boolean = false
  totalComment: number = 0
  comment: any[] = []
  checked: boolean = false;
  FormPolling : boolean = false
  showCommentComponent: any[] = []

  dataPosting = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    question: [''],
    user: this.fb.group({
      id: [''],
    }),
    pfile: this.fb.array([
    ]),
    postPollingOption: this.fb.array([])
  })

  dataOptions = this.fb.group({
    details: this.fb.array([])
  })
  dataComment = this.fb.group({
    content: [''],
    post: this.fb.group({
      id : ['']
    })
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


  label: string = 'Post Basic'
  labelStyle: string = ''
  disabledPolling : string = ''
  isChecked = false;
  type: string = ''
  constructor(private  fileService : FileService,private toast: ToastrService, private pollingService: PollingService, private postService: PostingService, private fb: FormBuilder, private articleService: ArticleService, private router: Router, private apiService: ApiService, private userService: UsersService) { }
  ngOnInit(): void {
    if (this.checked == true) {
      console.log(this.checked);
      // this.isChecked = true
      
    } else {
      console.log('basic');
      console.log(this.checked);
      // this.isChecked = false
    }
    this.init();
  }

  onChange(isChecked : any) {
    if (isChecked == true) {
      this.label = 'Post Premium'
      this.labelStyle = 'text-yellow-500'
      this.disabledPolling = 'p-disabled'
    } else {
      this.label = 'Post Basic'
      this.labelStyle = ''
      this.disabledPolling = ''
    }
    console.log(isChecked);
    
  }

  insertPosting() {
    this.dataPosting.patchValue({
      user: {
        id: this.apiService.getIdUser()
      }
    });

    if (this.postPollingOption.value.length != 0) {
        this.insertPostBasicSubscription = this.postService.postInsertPolling(this.dataPosting.value).subscribe(result => {
          this.init()
          this.FormPolling = false
        })
    } else {
      if (this.label == 'Post Premium') {
        this.insertPostBasicSubscription = this.postService.postInsertPremium(this.dataPosting.value).subscribe(result => {
          this.init()
        })
      } else {
        this.insertPostBasicSubscription = this.postService.postInsertBasic(this.dataPosting.value).subscribe(result => {
          this.init()
        })
      }
    }
    
   this.dataPosting.reset()
  }

  fileUpload(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileService.fileUploadMultiple(event, i).then(result => {
        this.detailFoto.push(this.fb.group({ fileExtensions: result[0], fileEncode: result[1] }));
      })
    }    
  }

  get detailFoto(): FormArray {
    return this.dataPosting.get('pfile') as FormArray
  }

  addOption() {
    const newUserReq = this.fb.group({
      content: [''],
    })
    this.postPollingOption.push(newUserReq)
  }

  get postPollingOption(): FormArray {
    return this.dataPosting.get('postPollingOption') as FormArray
  }

  removeReactive(i: number) {
    if (i < 2) {
      this.toast.error('Option For Polling min 2 Options.', 'Remove Failed')
    }
    else {
      this.postPollingOption.removeAt(i)
    }
  }
  removeAll() {
    this.postPollingOption.value.length = 0
  }

  showFormPolling() {
    this.FormPolling = true
  }
  closeForm() {
    this.FormPolling = false
  }

  init(): void {
    const id = this.apiService.getIdUser()
    this.getAllUserSubscription = this.userService.getUsersById(String(id)).subscribe(result => {
      this.fullname = result.fullname
      this.idUser = result.id
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
    this.getAllPost()
  }

  getAllPost() {
    this.getAllPostSubscription = this.postService.getAll(this.start, this.limit).subscribe(result => {
      this.posts = result
      this.loader = false
      
    })
  }
  displayCommentsComponent(id: string, index: any) {
   
    this.showCommentComponent[index] = !this.showCommentComponent[index];
    this.getCommetByIdSubcription  = this.postService.getCommentByIdPost(id).subscribe(result => {
      this.comment = result
    })
  }

  getCommentByPostId(id: string,index : any) {
    console.log('ini comment id:' ,id);
    this.getCommetByIdSubcription  = this.postService.getCommentByIdPost(id).subscribe(result => {
      this.comment = result
    })
  }


  replay(id: string, i: any) {
    this.dataComment.patchValue({
      post: {
        id : id
      }
    })
    this.insertCommentSubscription = this.postService.insertComment(this.dataComment.value).subscribe(result => {
      this.getCommentByPostId(id, i)
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
    this.getCommetByIdSubcription?.unsubscribe()
    this.insertCommentSubscription?.unsubscribe()
    this.getAllPostSubscription?.unsubscribe()
    this.unlikeSubscription?.unsubscribe()
    this.likeSubscription?.unsubscribe()
    this.unbookmarkSubscription?.unsubscribe()
    this.bookmarkSubscription?.unsubscribe()
    this.pollingSubscription?.unsubscribe()
    this.insertPostBasicSubscription?.unsubscribe()
  }
}
