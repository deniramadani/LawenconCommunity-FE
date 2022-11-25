import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Payment } from 'projects/interface/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  constructor(private http: HttpClient) { }

  getAllPaymentProduct(start : number , limit : number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${BASE_URL.BASE_URL}/payments?start=${start}&limit=${limit}`)
  }
}
