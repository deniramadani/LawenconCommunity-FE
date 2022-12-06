import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { ArticleService } from 'projects/memberarea/src/app/service/article.service';
import { Subscription } from 'rxjs'
import { Article} from '../../../../../../interface/article'

@Component({
  selector: 'app-list.article',
  templateUrl: './list.article.component.html'
})
export class ListArticleComponent implements OnInit,OnDestroy {
  private getAllSubscription? : Subscription
  dataArticle : Article[] = []
  articles: any[] = []
  page: number = 1
  data : any = new Object
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private articleService : ArticleService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.articleService.getArticle(0,40).subscribe(result => {
      this.dataArticle = result
      this.data = result
        for (let i = 0; i < result.length ; i++) {
          this.articles.push({
              id : this.dataArticle[i].id,
              title : this.dataArticle[i].title,
              content : this.dataArticle[i].content
          })
        }
        console.log(result);
    })
  }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
