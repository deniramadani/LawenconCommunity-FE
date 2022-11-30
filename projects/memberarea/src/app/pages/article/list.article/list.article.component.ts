import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Article } from 'projects/interface/article';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../service/article.service';

@Component({
  selector: 'app-list.article',
  templateUrl: './list.article.component.html',
})

export class ListArticleComponent implements OnInit, OnDestroy {

  data: Article[] = []

  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  start : number = 0;
  limit : number = 6;

  private articleGetAllSubscription? : Subscription

  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
    this.init()
  }
  
  init(): void {
    this.articleGetAllSubscription = this.articleService.getArticle(this.start, this.limit).subscribe(result => {
      this.data = result
      console.log(this.data);
    })
  }

  onScroll(): void {
    this.addLimit()
    this.init()
  }

  addLimit(): void {
    this.limit += 6
  }

  ngOnDestroy(): void {
      this.articleGetAllSubscription?.unsubscribe()
  }

}