import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from "rxjs"
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  generateCode(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/verification-code/generate`, data)
  }
  validateCode(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/verification-code/validate`, data)
  }
  register(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/register/member`, data)
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, data)
  }
}
