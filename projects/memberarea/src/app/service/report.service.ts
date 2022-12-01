import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { Report } from "../../../../interface/report";
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) { }

  getMemberRevenueReportData(data : any) : Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/reports/revenue/member/data`,data)
  }

  reportMemberRevenueReport(data : any) : Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/reports/revenue/member`,data)
  }
}
