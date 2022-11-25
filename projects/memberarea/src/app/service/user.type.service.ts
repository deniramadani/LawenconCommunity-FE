import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Observable } from 'rxjs';
import { UserType } from '../../../../interface/user-type'
@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  constructor(private http: HttpClient) { }

  getAllUserType(): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${BASE_URL.BASE_URL}/user-types`)
  }

}
