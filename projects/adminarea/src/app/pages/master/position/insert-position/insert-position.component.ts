import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { finalize, Subscription } from 'rxjs'
@Component({
  selector: 'app-insert-position',
  templateUrl: './insert-position.component.html',
})
export class InsertPositionComponent implements OnInit,OnDestroy {
  private insertPositionSubscription?: Subscription
  loaderButton: boolean = false
  dataInsert = this.fb.group({
    positionName : ['',[Validators.required]]
  })
  constructor(private positionService : PositionService,private fb : FormBuilder,private router : Router) { }
  
  ngOnInit(): void {
    
  }

  sumbit() {
    this.loaderButton = true
    this.insertPositionSubscription = this.positionService.insertPosition(this.dataInsert.value).pipe(finalize(()=>this.loaderButton =false)).subscribe(result => {
      this.router.navigateByUrl('/master/positions')
    })
  }
  
  ngOnDestroy(): void {
    this.insertPositionSubscription?.unsubscribe()
  }
}
