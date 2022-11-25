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
  selectedPosition: string = ''
  selectedIndustry: string = ''
  dataUpdate = this.fb.group({
    id : ['',[Validators.required]],
    fullname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    phoneNumber : ['',[Validators.required]],
    address : ['',[Validators.required]],
    company: ['', [Validators.required]],
    dateOfBirth :  ['', [Validators.required]],
    industryId: this.fb.group({
      id : this.selectedPosition
    }),
    positionId: this.fb.group({
      id : this.selectedIndustry
    }),
    userSocmed: this.fb.group({
      facebook : ['', [Validators.required]],
      instagram : ['', [Validators.required]],
      linkedin :['', [Validators.required]],
    })

  }) 

  constructor(private userService : UsersService,private apiService : ApiService,private positionService : PositionService,private industryService : IndustryService,private fb : FormBuilder ){}
  ngOnInit(): void {

      this.positionsSubscription = this.positionService.getPosition(0,100).subscribe(result => {
        this.dataPosition = result
          for (let i = 0; i < result.length ; i++) {
            this.positions.push({
                id : this.dataPosition[i].id,
                positionName : this.dataPosition[i].positionName
            })
          }
      })

      this.industrySubscription = this.industryService.getIndustry(0,100).subscribe(result => {
        this.dataIndustry = result
        for (let i = 0; i < result.length ; i++) {
          this.industries.push({
              id : this.dataIndustry[i].id,
              industryName : this.dataIndustry[i].industryName
          })
        }
      })

      const id = this.apiService.getIdUser()
    this.dataUserSubscription = this.userService.getUsersById(String(id)).subscribe(result => {
      this.dataUpdate.patchValue({
          id : result.id,
          fullname: result.fullname,
          email: result.email,
        company: result.company,
        address: result.address,
        phoneNumber: result.phoneNumber,
        userSocmed: {
          facebook : result.userSocmed.facebook,
          instagram : result.userSocmed.instagram,
          linkedin : result.userSocmed.linkedin
        }
        })

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
