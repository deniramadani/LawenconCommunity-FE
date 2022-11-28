import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Post } from 'projects/interface/post';
import { PostLike } from 'projects/interface/post-like';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostingService {
  constructor(private http: HttpClient) { }

  postInsertBasic(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/posts/basic`, data)
  }

  paymentProduct(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/payments`, data)
  }

  getAll(start: number, limit: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL.BASE_URL}/posts?start=${start}&limit=${limit}`)
  }
  unlike(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL.BASE_URL}/post-likes/${id}`)
  }
  like(data: any): Observable<any> {
    return this.http.post(`${BASE_URL.BASE_URL}/post-likes`, data)
  }
  unbookmark(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL.BASE_URL}/post-bookmarks/${id}`)
  }
  bookmark(data: any): Observable<any> {
    return this.http.post(`${BASE_URL.BASE_URL}/post-bookmarks`, data)
  }

  getPostById(id: string): Observable<Post>{
    return this.http.get<Post>(`${BASE_URL.BASE_URL}/posts/${id}`)
  }
}
