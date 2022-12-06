import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { ArticleService } from 'projects/memberarea/src/app/service/article.service';
import { Subscription } from 'rxjs'
import { Article} from '../../../../../../interface/article'
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-list.article',
  templateUrl: './list.article.component.html',
  providers: [ConfirmationService]
})
export class ListArticleComponent implements OnInit,OnDestroy {
  private getAllSubscription?: Subscription
  private pageChangeSubscription?: Subscription
  private getDataCount?: Subscription
  private deleteArticleSubscription? : Subscription
  dataArticle : Article[] = []
  articles: Article[] = []
  articleId : string =''
  page: number = 1
  seeMore : boolean =false
  data: any = new Object
  first = 0
  rows = 10
  totalArticle: number = 0
  title : string = ''
  showTextMore : any[] = []
  limit = this.rows
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  constructor(private articleService : ArticleService,private dataService :DashboardService,private confirmationService: ConfirmationService) { }
  

  ngOnInit(): void {
   this.onInit()
  }

  onInit() {
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
  showMore(index : any) {
    this.showTextMore[index] = !this.showTextMore[index];
    this.title =  this.dataArticle[index].content
    
    this.seeMore = true
  }

  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        key: "positionDialog",
        accept: () => {
          this.deleteArticleSubscription = this.articleService.deleteArticle(id).subscribe(result => {
            this.onInit()
          })
        }
    });
  }

  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.pageChangeSubscription?.unsubscribe()
    this.getDataCount?.unsubscribe()
    this.deleteArticleSubscription?.unsubscribe()
  }

}
