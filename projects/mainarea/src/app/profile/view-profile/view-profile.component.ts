import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../../service/position.service';
import { Subscription } from 'rxjs'
import { Position } from '../../../../../interface/position'
import { IndustryService } from '../../service/industry.service';
import { Industry } from '../../../../../interface/industry'
import { ApiService } from '../../service/api.service';
import { User } from '../../../../../interface/user'
import { UsersService } from '../../service/users.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
})
export class ViewProfileComponent implements OnInit,OnDestroy{
  private positionsSubscription? : Subscription
  private industrySubscription? : Subscription
  private dataUserSubscription? : Subscription
  positions: any[] = []
  industries: any[] = []
  dataPosition : Position[] = []
  dataIndustry : Industry[] = []
  fullname:string = ''
  email:string =''
  position:string = ''
  phoneNumber:string = ''
  fotoProfile:string=''
  address:string=''
  company:string=''
  positionUser :string =''
  industryUser :string =''
  constructor(private userService : UsersService,private apiService : ApiService,private positionService : PositionService,private industryService : IndustryService){}
  ngOnInit(): void {

      this.positionsSubscription = this.positionService.getPosition().subscribe(result => {
        this.dataPosition = result
          for (let i = 0; i < result.length ; i++) {
            this.positions.push({
                id : this.dataPosition[i].id,
                positionName : this.dataPosition[i].positionName
            })
          }
      })

      this.industrySubscription = this.industryService.getIndustry().subscribe(result => {
        this.dataIndustry = result
        for (let i = 0; i < result.length ; i++) {
          this.industries.push({
              id : this.dataIndustry[i].id,
              industryName : this.dataIndustry[i].industryName
          })
        }
      })

      const id = this.apiService.getIdUser()
      this.dataUserSubscription = this.userService.getAllUsersById(String(id)).subscribe(result => {
        this.fullname = result.fullname
        this.email = result.email
        if(result.position.positionName != null){
          this.position = result.position.positionName
        }else{
          this.position = '-'
        }
  
        if(result.phoneNumber != null){
          this.phoneNumber = result.phoneNumber
        }else{
          this.phoneNumber = '-'
        }
   
        this.fotoProfile = result.photo.id
        this.address = result.address
        this.company = result.company
        this.industryUser = result.industry.industryName
        this.positionUser = result.position.positionName
      })

    }
 
  ngOnDestroy(): void {
    this.positionsSubscription?.unsubscribe()
    this.industrySubscription?.unsubscribe()
    this.dataUserSubscription?.unsubscribe()
  }


}
