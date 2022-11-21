import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { Article } from '../../../../interface/article'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(`${BASE_URL.BASE_URL}/articles`)
  }
}
