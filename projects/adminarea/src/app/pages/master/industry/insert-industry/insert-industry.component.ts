import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { finalize, Subscription } from 'rxjs'

@Component({
  selector: 'app-insert-industry',
  templateUrl: './insert-industry.component.html',
})
export class InsertIndustryComponent implements OnInit,OnDestroy {
  private insertIndustrySubscription?: Subscription
  loaderButton: boolean = false
  dataInsert = this.fb.group({
    industryName: ['',[Validators.required]]
  })
  constructor(private industryService: IndustryService, private fb: FormBuilder,
    private router: Router, private title: Title) {
    this.title.setTitle('New Industry')
     }
  

  ngOnInit(): void {
    
  }

  submit() {
    this.loaderButton = true
    this.insertIndustrySubscription = this.industryService.insertIndustry(this.dataInsert.value).pipe(finalize(()=>this.loaderButton = false)).subscribe(result => {
      this.router.navigateByUrl('/master/industries')
    })
  }

  ngOnDestroy(): void {
    this.insertIndustrySubscription?.unsubscribe()
  }

}
