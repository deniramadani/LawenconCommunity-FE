import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-update-industry',
  templateUrl: './update-industry.component.html',
})
export class UpdateIndustryComponent implements OnInit,OnDestroy {

  private getIndustryByIdSubscription?: Subscription
  private updateIndustrySubscription?: Subscription
  dataUpdate = this.fb.group({
    id: [''],
    industryName: ['', [Validators.required]],
    isActive: [true, [Validators.required]],
    version: [0, [Validators.required]]
  })

  constructor(private industryService : IndustryService,private activedParam : ActivatedRoute,private fb : FormBuilder) { }
 

  ngOnInit(): void {
    this.getIndustryByIdSubscription = this.activedParam.params.subscribe(id => {
      this.industryService.industriesGetById(String(Object.values(id))).subscribe(result => {
        this.dataUpdate.patchValue({
          id: result.id,
          isActive: result.isActive,
          industryName: result.industryName,
          version : result.version
        })
        console.log(id);
        
      })
    })
  }

  update() {
    this.updateIndustrySubscription = this.industryService.updateIndustry(this.dataUpdate.value).subscribe(result => {
    })
  }

  ngOnDestroy(): void {
    this.getIndustryByIdSubscription?.unsubscribe()
    this.updateIndustrySubscription?.unsubscribe()
  }

}
