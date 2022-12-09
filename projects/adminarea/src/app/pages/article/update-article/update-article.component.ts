import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'projects/memberarea/src/app/service/article.service';
import {finalize, Subscription} from 'rxjs'

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
})
export class UpdateArticleComponent implements OnInit ,OnDestroy{
  private updateArticleSubscription ?: Subscription
  private getArticleByIdSubscription?: Subscription
  loaderButton:boolean = false
  dataUpdate = this.fb.group({
    id : ['',[Validators.required]],
    title : ['',[Validators.required]],
    content: ['', [Validators.required]],
    isActive : [true,[Validators.required]],
    file: this.fb.group({
      fileEncode: [''],
      fileExtensions : ['']
    }),
  })
  constructor(private toast: ToastrService, private activedParam: ActivatedRoute,
    private fb: FormBuilder, private articleService: ArticleService, private title : Title) { 
      this.title.setTitle('Update Article')
    }
 
 
  ngOnInit(): void {
    this.getArticleByIdSubscription = this.activedParam.params.subscribe(id => {
      this.articleService.getArticleById(String(Object.values(id))).subscribe(result => {
        this.dataUpdate.patchValue({
          id: result.id,
          title: result.title,
          content: result.content,
          isActive: result.isActive,
          file: {
            fileEncode: result.file.fileEncode,
            fileExtensions : result.file.fileExtensions
          }
        })
      })
    })
  }

  update() {
    if (this.dataUpdate.get('file')?.value == null) {
        this.toast.warning('Please select a photo article')
    } else {
      this.loaderButton = true
      this.updateArticleSubscription = this.articleService.updateArticle(this.dataUpdate.value).pipe(finalize(() => this.loaderButton = false)).subscribe(result => {
      })
    }
    
  }
  

  fileUpload(event : any) : void {
      const toBase64 = (file : File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if(typeof reader.result === "string") resolve(reader.result)
       
      }
      reader.onerror = error => reject(error)
  })

    toBase64(event.target.files[0]).then(result =>{
        const resulltStr = result.substring(result.indexOf(",")+1,result.length)
        const resultExtension = result.split(";")[0].split('/')[1]
          this.dataUpdate.patchValue({
            file: {
              fileEncode: resulltStr,
              fileExtensions : resultExtension
            }
          });
        })
    }

  ngOnDestroy(): void {
    this.updateArticleSubscription?.unsubscribe()
    this.getArticleByIdSubscription?.unsubscribe()
  }
}
