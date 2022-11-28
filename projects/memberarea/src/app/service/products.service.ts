import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { Product } from '../../../../interface/product'
import { Schedule } from '../../../../interface/schedule'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllEvents(start : number , limit : number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${BASE_URL.BASE_URL}/products/events?start=${start}&limit=${limit}`)
  }

  getAllCourses(start : number , limit : number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${BASE_URL.BASE_URL}/products/courses?start=${start}&limit=${limit}`)
  }

  productGetById(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${BASE_URL.BASE_URL}/products/${id}`)
  }
  insertProduct(data: any): Observable<Schedule>{
    return this.http.post<Schedule>(`${BASE_URL.BASE_URL}/products`,data)
  }

  getIdSubcription(): Observable<Schedule> {
    return this.http.get<Schedule>(`${BASE_URL.BASE_URL}/products/subscribe`)
  }

  paymentSubcription(data: any): Observable<any>{
    return this.http.post<any>(`${BASE_URL.BASE_URL}/payments/subscriptions`,data)
  }
  
}
