import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
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
  providers: [ConfirmationService]

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
  private updatePostSubscription?: Subscription
  private getCommetByIdSubcription?: Subscription
  private insertCommentSubscription?: Subscription
  private updateCommentSubscription?: Subscription
  private deleteCommentSubscription?:Subscription
  posts : Post[] = []
  postsLike: Post[] = []
  postsBookmark: Post[] = []
  items: any[] = []
  showCommentComponent: any[] = []
  comment: any[] = []
  start = 0
  limit = 3
  loader = false
  id: string = ''
  name: string | null = ''
  position : string =''
  idUser: string = String(this.apiService.getIdUser())
  photoId: null | string = ''
  seeMoreNoPremium : boolean = false
  premium = PostTypeConst.PREMIUM
  basic = PostTypeConst.BASIC
  polling = PostTypeConst.POLLING
  formCommnetUpdate : any [] = []
  userType: string | null = this.apiService.getUserType()
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  seeMore : boolean =false
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
  updatePost = this.fb.group({
    id : [''],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  })
  dataComment = this.fb.group({
    content: [''],
    post: this.fb.group({
      id : ['']
    })
  })
  updateComment = this.fb.group({
    id: ['', [Validators.required]],
    content: ['', [Validators.required]],
    isActive : [true]
  })

  formUpdatePost : boolean = false

  constructor(private router : Router,private confirmationService: ConfirmationService,private fb : FormBuilder,private pollingService : PollingService,private postService : PostingService,private apiService : ApiService ,private toast : ToastrService) { }
  
  ngOnInit() {
    this.init()
    this.name = this.apiService.getProfileName()
    this.items = [
      {
        label: 'Delete', icon: 'pi pi-trash', command: (event: any) => {
      }},
      {label: 'Edit', icon: 'pi pi-pencil'}
      ];
  }

  init() {
    this.getAllPostSubscription = this.postService.getPostByIdUser(this.start,this.limit).subscribe(result => {
      this.posts = result
      this.photoId = result[0].user.photo.id      
    })
    this.getPostLikeSubscription = this.postService.getPostLikeByIdUser(this.start,this.limit).subscribe(result => {
      this.postsLike = result     
    })

    this.getPostBookmarkSubscription = this.postService.getBookmarkByIdUser(this.start,this.limit).subscribe(result => {
      this.postsBookmark = result     
    })
  }
  btnUpdateComment(idpost : string,index : any) {
    this.updateCommentSubscription = this.postService.updateComment(this.updateComment.value).subscribe(result => {
      this.getCommentByPostId(idpost,index)
      this.formCommnetUpdate[index] = false
    })
  }
  onScroll() {
    this.limit += 3
    this.init()
  }

  premiumPost(id: string) {
    if (this.userType != UserTypeConst.PREMIUM) {
      this.toast.error("Please Subscribe to Access Full Features", "Premium Access Only!")
    } else {
      this.router.navigateByUrl(`/detail/${id}`)
    }
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

  displayCommentsComponent(id: string, index: any) {
    this.showCommentComponent[index] = !this.showCommentComponent[index];
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
      this.dataComment.patchValue({
        content : ''
      })
    })
  }

  clickConfirmDeleteComment(idpost : string,index : any,idComment : string) {
    this.confirmationService.confirm({
        message: `Do you want to delete this comment ?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
       
        accept: () => {
          this.deleteCommentSubscription = this.postService.deleteComment(idComment).subscribe(result => {
            this.getCommentByPostId(idpost,index)
          })
        },
        key: "commentDialog",
    });
  }

  
  showFormUpdateCommnet(index : any,content : string,id : string) {
    this.formCommnetUpdate[index] = !this.formCommnetUpdate[index]
    console.log(id, content);
    this.updateComment.patchValue({
      id: id,
      content : content
    })
  }

  getCommentByPostId(id: string,index : any) {
    this.getCommetByIdSubcription  = this.postService.getCommentByIdPost(id).subscribe(result => {
      this.comment = result
    })
  }

  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this post?',
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
    this.updatePostSubscription?.unsubscribe()
    this.unlikeSubscription?.unsubscribe()
    this.likeSubscription?.unsubscribe()
    this.unbookmarkSubscription?.unsubscribe()
    this.bookmarkSubscription?.unsubscribe()
    this.pollingSubscription?.unsubscribe()
    this.deletePostSubscription?.unsubscribe()
    this.getCommetByIdSubcription?.unsubscribe()
    this.insertCommentSubscription?.unsubscribe()
    this.updateCommentSubscription?.unsubscribe()
    this.deleteCommentSubscription?.unsubscribe()
  }
}
