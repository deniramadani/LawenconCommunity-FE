import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { Industry } from '../../../../interface/industry'

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  constructor(private http: HttpClient) {}

  getIndustry(start : number , limit : number): Observable<Industry[]> {
    return this.http.get<Industry[]>(`${BASE_URL.BASE_URL}/industries?start=${start}&limit=${limit}`)
  }
  insertIndustry(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/industries`, data)
  }
  updateIndustry(data: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL.BASE_URL}/industries`, data)
  }
  industriesGetById(id : string): Observable<Industry> {
    return this.http.get<Industry>(`${BASE_URL.BASE_URL}/industries/${id}`)
  }
  deleteIndustry(id : string): Observable<Industry> {
    return this.http.delete<Industry>(`${BASE_URL.BASE_URL}/industries/${id}`)
  }
}
