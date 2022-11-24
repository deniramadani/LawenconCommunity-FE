import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { PostLike } from 'projects/interface/post-like';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PollingService {
    constructor(private http: HttpClient) { }

    polling(data: any): Observable<any> {
        return this.http.post(`${BASE_URL.BASE_URL}/post-polling-responses`, data)
    }
}
