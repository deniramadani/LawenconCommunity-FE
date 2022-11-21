import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { Position } from '../../../../interface/position'
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient) { }

  getPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(`${BASE_URL.BASE_URL}/positions`)
  }
}
