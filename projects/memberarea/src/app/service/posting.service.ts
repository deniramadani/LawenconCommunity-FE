import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostingService {
  constructor(private http: HttpClient) { }

  postInsetBasic(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/posts/basic`, data)
  }
}
