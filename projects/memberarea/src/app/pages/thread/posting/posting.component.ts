import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FileService } from '../../../service/file.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostingService } from '../../../service/posting.service';
import { Subscription } from 'rxjs'
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  providers: [MessageService]

})
export class PostingComponent implements OnInit, OnDestroy {
  private insertPostBasicSubscription?: Subscription
  items: MenuItem[] = [];
  home!: MenuItem;
  uploadedFiles: any[] = [];
  typePost: any[] = []
  selectedTypePost: string = ''
  btnUploadFile: boolean = true
  btnPolling: boolean = false
  form_polling: boolean = false
  type: string = ''
  inputs: any[] = []
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
  buttonActions: { [id: string]: MenuItem[] } = {};

  constructor(private toast: ToastrService, private router: Router, private apiService: ApiService, private postService: PostingService, private fileService: FileService, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.typePost = [
      { name: 'Basic', id: 'BSC' },
      { name: 'Polling', id: 'POLL' },
      { name: 'Premium', id: 'PRM' },
    ]
    this.items = [
      {
        label: 'Home',
        routerLink: '/home'
      },
      {
        label: 'Thread',
        routerLink: '/thread'
      },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/home' };

  }

  getTypePosting(id: string) {
    this.type = id

    if (id != 'POLL') {
      this.btnUploadFile = true
      this.form_polling == false
      this.removeAll()

    }
    else if (id == 'POLL') {
      for (let i = 0; i < 2; i++) {
        this.addOption()
      }
      this.form_polling == true
      this.btnUploadFile = false
    }
  }


  get detailFoto(): FormArray {
    return this.dataPosting.get('pfile') as FormArray
  }



  showFormPolling() {
    this.form_polling = true
  }

  closeForm() {
    this.form_polling = false
  }

  fileUpload(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileService.fileUploadMultiple(event, i).then(result => {
        this.detailFoto.push(this.fb.group({ fileExtensions: result[0], fileEncode: result[1] }));
      })
    }
  }

  insertPosting() {
    this.dataPosting.patchValue({
      user: {
        id: this.apiService.getIdUser()
      }
    });
    if (this.type == "BSC") {
      this.insertPostBasicSubscription = this.postService.postInsertBasic(this.dataPosting.value).subscribe(result => {
        this.router.navigateByUrl('/home')
      })
    } else if (this.type == "POLL") {
      this.insertPostBasicSubscription = this.postService.postInsertPolling(this.dataPosting.value).subscribe(result => {
        this.router.navigateByUrl('/home')
      })
    } else {
      this.insertPostBasicSubscription = this.postService.postInsertPremium(this.dataPosting.value).subscribe(result => {
        this.router.navigateByUrl('/home')
      })
    }
  }

  ngOnDestroy(): void {
    this.insertPostBasicSubscription?.unsubscribe()
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


}
