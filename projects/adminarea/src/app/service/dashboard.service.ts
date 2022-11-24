import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { DashboardAdmin } from 'projects/interface/dashboard-admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getData(): Observable<DashboardAdmin> {
    return this.http.get<DashboardAdmin>(`${BASE_URL.BASE_URL}/dashboards`)
  }

  
}
