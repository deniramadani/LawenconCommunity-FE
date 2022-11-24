import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-insert-position',
  templateUrl: './insert-position.component.html',
})
export class InsertPositionComponent implements OnInit,OnDestroy {
  private insertPositionSubscription?: Subscription
  dataInsert = this.fb.group({
    positionName : ['',[Validators.required]]
  })
  constructor(private positionService : PositionService,private fb : FormBuilder,private router : Router) { }
  
  ngOnInit(): void {
    
  }

  sumbit() {
    this.insertPositionSubscription = this.positionService.insertPosition(this.dataInsert.value).subscribe(result => {
      this.router.navigateByUrl('/master/positions')
    })
  }
  
  ngOnDestroy(): void {
    this.insertPositionSubscription?.unsubscribe()
  }
}
