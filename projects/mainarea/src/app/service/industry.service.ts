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

  getIndustry(): Observable<Industry[]> {
    return this.http.get<Industry[]>(`${BASE_URL.BASE_URL}/industries`)
  }
  
}
