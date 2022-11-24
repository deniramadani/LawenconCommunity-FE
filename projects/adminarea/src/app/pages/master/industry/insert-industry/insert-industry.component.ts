import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-insert-industry',
  templateUrl: './insert-industry.component.html',
})
export class InsertIndustryComponent implements OnInit,OnDestroy {
  private insertIndustrySubscription?: Subscription
  dataInsert = this.fb.group({
    industryName: ['',[Validators.required]]
  })
  constructor(private industryService : IndustryService,private fb : FormBuilder,private router : Router) { }
  

  ngOnInit(): void {
    
  }

  submit() {
    this.insertIndustrySubscription = this.industryService.insertIndustry(this.dataInsert.value).subscribe(result => {
      this.router.navigateByUrl('/master/industries')
    })
  }

  ngOnDestroy(): void {
    this.insertIndustrySubscription?.unsubscribe()
  }

}
