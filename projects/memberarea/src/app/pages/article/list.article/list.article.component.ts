import { Component, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Article } from 'projects/interface/article';
import { Schedule } from 'projects/interface/schedule';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../service/article.service';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-list.article',
  templateUrl: './list.article.component.html',
})

export class ListArticleComponent implements OnInit, OnDestroy {

  data: Article[] = []
  dataEvent : Schedule[]= []
  dataCourse: Schedule[] = []
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  start : number = 0;
  limit: number = 3;
  seeMore: boolean = false;

  private articleGetAllSubscription?: Subscription
  private getAllEventSubscription?: Subscription
  private getAllCourseSubscription?: Subscription

  constructor(private articleService : ArticleService,private productService : ProductsService) { }

  ngOnInit(): void {
    this.init()
  }
  
  init(): void {
    this.articleGetAllSubscription = this.articleService.getArticle(this.start, this.limit).subscribe(result => {
      this.data = result
      console.log(this.data);
    })

    this.getAllEventSubscription = this.productService.getAllEvents(0,1).subscribe(result => {
      this.dataEvent = result      
    })

    this.getAllCourseSubscription = this.productService.getAllCourses(0,1).subscribe(result => {
      this.dataCourse = result      
    })
  }

  onScroll(): void {
    this.addLimit()
    this.init()
  }

  addLimit(): void {
    this.limit += 3
  }

  ngOnDestroy(): void {
    
    this.articleGetAllSubscription?.unsubscribe()
    this.getAllCourseSubscription?.unsubscribe()
    this.getAllCourseSubscription?.unsubscribe()
  }

}