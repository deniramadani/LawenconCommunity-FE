import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { ProductType } from 'projects/interface/product-type';
import { Schedule } from 'projects/interface/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  constructor(private http: HttpClient) { }

  getAllProductType(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${BASE_URL.BASE_URL}/product-types`)
  }



}
