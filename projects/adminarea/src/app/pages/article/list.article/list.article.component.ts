import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { ArticleService } from 'projects/memberarea/src/app/service/article.service';
import { Subscription } from 'rxjs'
import { Article} from '../../../../../../interface/article'
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-list.article',
  templateUrl: './list.article.component.html'
})
export class ListArticleComponent implements OnInit,OnDestroy {
  private getAllSubscription?: Subscription
  private pageChangeSubscription?: Subscription
  private getDataCount?:Subscription
  dataArticle : Article[] = []
  articles: Article[] = []
  page: number = 1
  seeMore : boolean =false
  data: any = new Object
  first = 0
  rows = 10
  totalArticle: number = 0
  limit = this.rows
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private articleService : ArticleService,private dataService :DashboardService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.articleService.getArticle(this.first, this.limit).subscribe(result => {
      this.dataArticle = []
      for (let i = 0; i < result.length; i++) {
          this.dataArticle.push(result[i])
    }
  
    })
    this.getDataCount = this.dataService.getData().subscribe(result => {
      this.totalArticle = result.articleTotal
    })
  }

  
  getData(offset: number, limit: number) {
    this.pageChangeSubscription = this.articleService.getArticle(offset, limit).subscribe(result => {
        this.dataArticle = []
        for (let i = 0; i < result.length; i++) {
            this.dataArticle.push(result[i])
        }
    })
  }

  loadData(event: LazyLoadEvent) {
      this.getData(event.first!, event.rows!)
  }

  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
