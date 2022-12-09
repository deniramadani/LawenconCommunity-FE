import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Article } from 'projects/interface/article';
import { Subscription } from "rxjs";
import { ArticleService } from '../../../service/article.service';
@Component({
  selector: 'app-detail.article',
  templateUrl: './detail.article.component.html',

})
export class DetailArticleComponent implements OnInit,OnDestroy {
  private getArticleByidSubscription?: Subscription
  private getAllArticleSubscription?: Subscription
  data: any = new Object
  dataArticle: Article[] = []
  seeMore: boolean = false
  title: string = ''
  fileId: string = ''
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private articleService : ArticleService,private activedParam : ActivatedRoute) { }
  

  ngOnInit(): void {
    this.getArticleByidSubscription = this.activedParam.params.subscribe(id => {
      this.getArticleByidSubscription = this.articleService.getArticleById(String(Object.values(id))).subscribe(result => {
        this.data = result
        this.title = result.title
        this.fileId = result.file.id
      })
    })
    this.getAllArticleSubscription = this.articleService.getArticle(0, 4).subscribe(result => {
      this.dataArticle = result
    })
  }

  ngOnDestroy(): void {
    this.getArticleByidSubscription?.unsubscribe()
    this.getAllArticleSubscription?.unsubscribe()
  }

}
