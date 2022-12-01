import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Subscription } from "rxjs";
import { ArticleService } from '../../../service/article.service';
@Component({
  selector: 'app-detail.article',
  templateUrl: './detail.article.component.html',

})
export class DetailArticleComponent implements OnInit,OnDestroy {
  private getArticleByidSubscription?: Subscription
  data: any = new Object
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private articleService : ArticleService,private activedParam : ActivatedRoute) { }
  

  ngOnInit(): void {
    this.getArticleByidSubscription = this.activedParam.params.subscribe(id => {
      this.getArticleByidSubscription = this.articleService.getArticleById(String(Object.values(id))).subscribe(result => {
        this.data = result
      })
    })
  }

  ngOnDestroy(): void {
   this.getArticleByidSubscription?.unsubscribe()
  }

}
