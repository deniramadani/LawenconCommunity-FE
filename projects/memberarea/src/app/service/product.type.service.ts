import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { ProductType } from 'projects/interface/product-type';
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
