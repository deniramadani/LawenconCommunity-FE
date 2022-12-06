import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Payment } from 'projects/interface/payment';
import { Post } from 'projects/interface/post';
import { Observable } from 'rxjs';
import { Comment } from "../../../../interface/comment";

@Injectable({
  providedIn: 'root'
})
export class PostingService {
  constructor(private http: HttpClient) { }

  postInsertBasic(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/posts/basic`, data)
  }
  postInsertPolling(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/posts/polling`, data)
  }
  postInsertPremium(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/posts/premium`, data)
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

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${BASE_URL.BASE_URL}/posts/${id}`)
  }

  getCommentByIdPost(id: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${BASE_URL.BASE_URL}/comments/post/${id}`)
  }

  getPostByIdPost(id: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${BASE_URL.BASE_URL}/posts/${id}`)
  }

  getPostLikeByIdUser(start: number, limit: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL.BASE_URL}/posts/like?start=${start}&limit=${limit}`)
  }

  getBookmarkByIdUser(start: number, limit: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL.BASE_URL}/posts/bookmark?start=${start}&limit=${limit}`)
  }

  getPostByIdUser(start: number, limit: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL.BASE_URL}/posts/user?start=${start}&limit=${limit}`)
  }

  getPostByOwnerId(idUser : string ,start: number, limit: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL.BASE_URL}/posts/user/${idUser}?start=${start}&limit=${limit}`)
  }

  insertComment(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/comments`, data)
  }

  deletePost(id : string): Observable<any> {
    return this.http.put(`${BASE_URL.BASE_URL}/posts/delete/${id}`,id)
  }


  getEventCourseBought(start: number, limit: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${BASE_URL.BASE_URL}/payments/users?start=${start}&limit=${limit}`)
  }

  getActivityOrders(start: number, limit: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${BASE_URL.BASE_URL}/payments/owners?start=${start}&limit=${limit}`)
  }

  updatePost(data: any): Observable<any>{
    return this.http.put<any>(`${BASE_URL.BASE_URL}/posts`,data)
  }

}
