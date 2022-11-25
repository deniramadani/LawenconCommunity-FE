import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'projects/memberarea/src/app/service/article.service';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-new.article',
  templateUrl: './new.article.component.html',
})
export class NewArticleComponent implements OnInit,OnDestroy {
  private insertArticleSubscription ?: Subscription

  dataInsert = this.fb.group({
    title : ['',[Validators.required]],
    content : ['',[Validators.required]],
    file: this.fb.group({
      fileEncode: [''],
      fileExtensions : ['']
    }),
  })
  constructor(private fb : FormBuilder,private articleService : ArticleService,private router : Router) { }
 
 
  ngOnInit(): void {
   
  }

  insertArticle(){
    this.insertArticleSubscription = this.articleService.insertArticle(this.dataInsert.value).subscribe(result => {
        this.router.navigateByUrl('/article')
    })
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
          this.dataInsert.patchValue({
            file: {
              fileEncode: resulltStr,
              fileExtensions : resultExtension
            }
          });
        })
    }

  ngOnDestroy(): void {
    this.insertArticleSubscription?.unsubscribe()
  }

}