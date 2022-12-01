import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Observable } from 'rxjs';
import { Position } from '../../../../interface/position'
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient) { }

  getPosition(start : number , limit : number): Observable<Position[]> {
    return this.http.get<Position[]>(`${BASE_URL.BASE_URL}/positions?start=${start}&limit=${limit}`)
  }

  insertPosition(data: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL.BASE_URL}/positions`, data)
  }
  
  updatePosition(data: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL.BASE_URL}/positions`, data)
  }
  positionGetById(id : string): Observable<Position> {
    return this.http.get<Position>(`${BASE_URL.BASE_URL}/positions/${id}`)
  }

  deletePosition(id : string): Observable<Position> {
    return this.http.delete<Position>(`${BASE_URL.BASE_URL}/positions/${id}`)
  }
}
