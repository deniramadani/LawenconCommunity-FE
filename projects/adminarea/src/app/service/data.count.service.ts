import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { DashboardAdmin } from 'projects/interface/dashboard-admin';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DataCountService{
  
  constructor(private dashboardService: DashboardService) { }

  getCountData() {
    
  }
  
 


 
}
