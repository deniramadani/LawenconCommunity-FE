import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  })

  constructor(private positionService : PositionService,private activedParam : ActivatedRoute,
    private fb: FormBuilder, private title: Title) { 
    this.title.setTitle('Update Position')
     }
 

  ngOnInit(): void {
    this.getPositionByIdSubscription = this.activedParam.params.subscribe(id => {
      this.positionService.positionGetById(String(Object.values(id))).subscribe(result => {
        // this.dataUpdate.patchValue({
        //   id: result.id,
        //   isActive: result.isActive,
        //   positionName: result.positionName,
        // })
        this.dataUpdate.patchValue(result)
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
