import {Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FileService } from '../../../service/file.service';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { PostingService } from '../../../service/posting.service';
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  providers: [MessageService]

})
export class PostingComponent implements OnInit,OnDestroy {
  private insertPostBasicSubscription? : Subscription
  items: MenuItem[] = [];
  home!: MenuItem;
  uploadedFiles: any[] = [];

  dataPosting = this.fb.group({
    title : ['',[Validators.required]],
    body : ['',[Validators.required]],
    user: this.fb.group({
      id: [''],
    }),
    file : this.fb.array([])
  }) 
  
  constructor(private router : Router,private apiService : ApiService,private postService : PostingService,private fileService : FileService,private fb : FormBuilder) {
  }
 
  ngOnInit() {
    this.items = [
        {
          label: 'Home',
          routerLink: '/members/home'
        },
        {
          label: 'Thread',
          routerLink: '/members/thread'
        },
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/members/home'};
  }

 
  get detailFoto(): FormArray {
    return this.dataPosting.get('file') as FormArray
  }

  fileUpload(event: any) {
    for(let i = 0; i < event.target.files.length; i++){
        this.fileService.fileUploadMultiple(event,i).then(result=>{
          this.detailFoto.push(this.fb.group({fileExtensions:result[0], fileEncode: result[1]}));
        })
    }
  }

  insertPosting(){
    this.dataPosting.patchValue({
      user: {
        id: this.apiService.getIdUser()
      }
    });
    this.insertPostBasicSubscription = this.postService.postInsetBasic(this.dataPosting.value).subscribe(result => {
        this.router.navigateByUrl('/members/home')
    })
  }  

  ngOnDestroy(): void {
   this.insertPostBasicSubscription?.unsubscribe()
  }
  

}
