import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { finalize, Subscription } from 'rxjs'
@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
})
export class UpdatePositionComponent implements OnInit,OnDestroy {
  private getPositionByIdSubscription?: Subscription
  private updatePositionSubscription?: Subscription
  loaderButton: boolean = false
  dataUpdate = this.fb.group({
    id: [''],
    positionName: ['', [Validators.required]],
    isActive: [true, [Validators.required]],
    version: [0, [Validators.required]]
  })

  constructor(private positionService : PositionService,private activedParam : ActivatedRoute,private fb : FormBuilder) { }
 

  ngOnInit(): void {
    this.getPositionByIdSubscription = this.activedParam.params.subscribe(id => {
      this.positionService.positionGetById(String(Object.values(id))).subscribe(result => {
        this.dataUpdate.patchValue({
          id: result.id,
          isActive: result.isActive,
          positionName: result.positionName,
          version : result.version
        })
      })
    })
  }

  update() {
    this.loaderButton = true
    this.updatePositionSubscription = this.positionService.updatePosition(this.dataUpdate.value).pipe(finalize(()=>this.loaderButton =false)).subscribe(result => {

    })
  }

  ngOnDestroy(): void {
    this.getPositionByIdSubscription?.unsubscribe()
    this.updatePositionSubscription?.unsubscribe()
  }

}
