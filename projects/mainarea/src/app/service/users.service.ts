import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from "rxjs"
import { HttpClient } from '@angular/common/http'
import { User } from '../../../../interface/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  generateCode(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/verification-code/generate`, data)
  }
  validateCode(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/verification-code/validate`, data)
  }
  register(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/register/member`, data)
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/login`, data)
  }
  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL.BASE_URL}/users`, data)
  }
  getUsersById(id: string): Observable<User> {
    return this.http.get<User>(`${BASE_URL.BASE_URL}/users/${id}`)
  }

  getAllUsers(start: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL.BASE_URL}/users?start=${start}&limit=${limit}`)
  }

  insertUser(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/users/`, data)
  }

  userUpdate(data: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL.BASE_URL}/users/`, data)
  }



}
