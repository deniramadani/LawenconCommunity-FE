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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  providers: [
    DatePipe
  ],
})
export class ViewProfileComponent implements OnInit,OnDestroy{
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  private positionsSubscription? : Subscription
  private industrySubscription? : Subscription
  private dataUserSubscription?: Subscription
  private updateUserSubscription?: Subscription
  date : any 
  positions: any[] = []
  industries: any[] = []
  dataPosition : Position[] = []
  dataIndustry : Industry[] = []
  selectedPosition: string = ''
  selectedIndustry: string = ''
  facebook : string = ''
  instagram: string = ''
  linkedin: string = ''
  fotoId: string = ''
  myDate: any 
  bod :  any
  formChangePassword : boolean = false
  formEditProfile : boolean = true
  dataUpdate = this.fb.group({
    id : ['',[Validators.required]],
    fullname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    phoneNumber : [''],
    address : [''],
    company: [''],
    dateOfBirth: [''],
    industry: this.fb.group({
      id : ['']
    }),
    position: this.fb.group({
      id : ['']
    }),
    userSocmed: this.fb.group({
      facebook : [''],
      instagram : [''],
      linkedin :[''],
    }),
    userType: this.fb.group({
      id : ['']
    })

  }) 

  constructor(private datePipe: DatePipe,private userService : UsersService,private apiService : ApiService,private positionService : PositionService,private industryService : IndustryService,private fb : FormBuilder ){}
  ngOnInit(): void {

    const id = this.apiService.getIdUser()
    this.dataUserSubscription = this.userService.getUsersById(String(id)).subscribe(result => {
      console.log(result);
      this.bod = result.dateOfBirth
      this.fotoId = result.photo.id
      if (result.userSocmed != null) {
        this.facebook = result.userSocmed.facebook
        this.instagram = result.userSocmed.instagram
        this.linkedin = result.userSocmed.linkedin
      } else {
        
      }
   
     
      this.dataUpdate.patchValue({
        id : result.id,
        fullname: result.fullname,
        email: result.email,
        company: result.company,
        address: result.address,
        phoneNumber: result.phoneNumber,
        industry: {
          id : this.selectedIndustry
        },
        position: {
          id : this.selectedPosition,
        },
        userType: {
          id : result.userType.id
        },
        dateOfBirth : result.dateOfBirth,
        userSocmed: {
          facebook: result.userSocmed.facebook,
          instagram: result.userSocmed.instagram,
          linkedin : result.userSocmed.linkedin
        }
       
      })
      console.log(this.dataUpdate.value);
    })

   this.getAllPosition()
   this.getAllIndustry()
  }
  onSelectMethod(event : any) {
    let d = new Date(Date.parse(event));
    this.myDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;  
    this.bod = this.datePipe.transform(this.myDate, "yyyy-MM-dd")
  }
  getAllPosition() {
    this.positionsSubscription = this.positionService.getPosition(0,100).subscribe(result => {
      this.dataPosition = result
        for (let i = 0; i < result.length ; i++) {
          this.positions.push({
              id : this.dataPosition[i].id,
              positionName : this.dataPosition[i].positionName
          })
        }
    })

  }

  btnShowFormChangePassword() {
    this.formChangePassword = true
    this,this.formEditProfile = false
  }
  btnShowFormEditProfile() {
    this.formEditProfile = true
    this.formChangePassword = false
  }

  getAllIndustry() {
    this.industrySubscription = this.industryService.getIndustry(0,100).subscribe(result => {
      this.dataIndustry = result
      for (let i = 0; i < result.length ; i++) {
        this.industries.push({
            id : this.dataIndustry[i].id,
            industryName : this.dataIndustry[i].industryName
        })
      }
    })
  }

  update() {
    this.dataUpdate.patchValue({
      dateOfBirth : String(this.bod)
    })
    this.updateUserSubscription = this.userService.updateProfile(this.dataUpdate.value).subscribe(result => {

    })
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
    this.updateUserSubscription?.unsubscribe()
  }
}
