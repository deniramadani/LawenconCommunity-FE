import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../../service/position.service';
import { Subscription } from 'rxjs'
import { Position } from '../../../../../interface/position'
import { IndustryService } from '../../service/industry.service';
import { Industry } from '../../../../../interface/industry'
import { ApiService } from '../../service/api.service';
import { UsersService } from '../../service/users.service';
import { BASE_URL } from 'projects/api/BaseUrl';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
})
export class ViewProfileComponent implements OnInit,OnDestroy{
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
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
  bod : string =''
  dataUpdate = this.fb.group({
    fullname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    phoneNumber : ['',[Validators.required]],
    address : ['',[Validators.required]],
    company: ['', [Validators.required]],
    industryId: this.fb.group({
      id : ['']
    }),
    positionId: this.fb.group({
      id : ['']
    })
  }) 

  constructor(private userService : UsersService,private apiService : ApiService,private positionService : PositionService,private industryService : IndustryService,private fb : FormBuilder ){}
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
        this.bod = result.dateOfBirth
      })

    }

  updateProfile(){
    console.log(this.dataUpdate.value);
    
  }

  getPosisitonId(id: string) {
    console.log(id);
    
  }

  onBasicUploadAuto(event:any) {
      console.log("berhasil");
  }
  ngOnDestroy(): void {
    this.positionsSubscription?.unsubscribe()
    this.industrySubscription?.unsubscribe()
    this.dataUserSubscription?.unsubscribe()
  }


}
