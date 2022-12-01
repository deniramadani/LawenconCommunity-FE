import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Observable } from 'rxjs';
import { Article } from '../../../../interface/article'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticle(start : number , limit : number): Observable<Article[]> {
    return this.http.get<Article[]>(`${BASE_URL.BASE_URL}/articles?start=${start}&limit=${limit}`)
  }

  insertArticle(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/articles`, data)
  }

  updateArticle(data: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL.BASE_URL}/articles`, data)
  }

  getArticleById(id : string): Observable<Article> {
    return this.http.get<Article>(`${BASE_URL.BASE_URL}/articles/${id}`)
  }
  
}
