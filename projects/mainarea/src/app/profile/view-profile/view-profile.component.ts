import { Component, OnDestroy, OnInit } from '@angular/core';
import { PositionService } from '../../service/position.service';
import { Subscription } from 'rxjs'
import { Position } from '../../../../../interface/position'
import { IndustryService } from '../../service/industry.service';
import { Industry } from '../../../../../interface/industry'
import { ApiService } from '../../service/api.service';
import { UsersService } from '../../service/users.service';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  private chagenPasswordSubcription?: Subscription
  positions: any[] = []
  industries: any[] = []
  dataPosition : Position[] = []
  dataIndustry : Industry[] = []
  selectedPosition: any 
  selectedIndustry: any 
  facebook : string = ''
  instagram: string = ''
  linkedin: string = ''
  fotoId: string = ''
  myDate: any 
  bod: any
  formChangePassword : boolean = false
  formEditProfile: boolean = true
  dataUser : any = new Object
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
    }),
    photo: this.fb.group({
      fileEncode : [''],
      fileExtensions : [''],
    })
  }) 

  updatePassword = this.fb.group({
    id: ['',[Validators.required]],
    email: ['',[Validators.required]],
    role: {
      id : ''
    },
    userType: {
      id : ''
    },
    oldPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['',[Validators.required]]
  })

  constructor(private toast : ToastrService,private datePipe: DatePipe,private userService : UsersService,private apiService : ApiService,private positionService : PositionService,private industryService : IndustryService,private fb : FormBuilder ){}
  ngOnInit(): void {
    this.onInit()
   
    
  }
  onInit() {
    this.getAllPosition()
    this.getAllIndustry()
    const id = this.apiService.getIdUser()
    this.dataUserSubscription = this.userService.getUsersById(String(id)).subscribe(result => {
    
      this.dataUser = result
      this.bod = result.dateOfBirth
      if (result.photo != null) {
        this.fotoId = result.photo.id
        this.dataUpdate.patchValue({
          photo: {
            fileEncode: result.photo.fileEncode,
            fileExtensions : result.photo.fileExtensions
          }
        });
      }
     
      if (result.userSocmed != null) {
        this.facebook = result.userSocmed.facebook
        this.instagram = result.userSocmed.instagram
        this.linkedin = result.userSocmed.linkedin
      } 

      if (result.position != null) {
        this.selectedPosition = result.position.id
      } else {
        this.selectedPosition = null
      }

      if (result.industry != null) {
        this.selectedIndustry = result.industry.id
      } else {
        this.selectedIndustry = null
      }
   
      this.dataUpdate.patchValue(result)

      this.dataUpdate.patchValue({ industry: { id: this.selectedIndustry } })
      this.dataUpdate.patchValue({ position: { id: this.selectedPosition }})
      this.updatePassword.patchValue({
        id: result.id,
        email: result.email,
        role: {
          id : result.role.id
        },
        userType: {
          id : result.userType.id
        }
      })
    })

  }

  onSelectMethod(event: any) {
    if (event != null) {
      let d = new Date(Date.parse(event));
      this.myDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;  
      this.bod = this.datePipe.transform(this.myDate, "yyyy-MM-dd")
    } else {
      this.bod = ""
    }
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

  fileUpload(event: any): void {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(event.files[0])
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      }
      reader.onerror = error => reject(error)
    })

    toBase64(event.files[0].name).then(result => {
    
        this.dataUpdate.patchValue({
          photo: {
            fileEncode: result.substring(result.indexOf(",") + 1, result.length),
            fileExtensions :  result.split(";")[0].split('/')[1]
          }
        });
     
      
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

  changePassword() {
    if(this.updatePassword.get('password')?.value == this.updatePassword.get('confirmPassword')?.value){
      this.chagenPasswordSubcription = this.userService.userUpdate(this.updatePassword.value).subscribe(() =>{})
    }else{
      this.toast.warning('wrong combinate password')
    }
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
    if (this.bod != null) {
      this.dataUpdate.patchValue({
        dateOfBirth : this.bod
      })
    }

    this.dataUpdate.patchValue({
      userSocmed: {
        instagram: this.instagram,
        facebook: this.facebook,
        linkedin : this.linkedin
      },
      industry: {
        id: this.selectedIndustry
      },
      position: {
        id : this.selectedPosition
      }

    })

    
    this.updateUserSubscription = this.userService.updateProfile(this.dataUpdate.value).subscribe(result => {
      this.onInit()
    })
  }

  ngOnDestroy(): void {
    this.positionsSubscription?.unsubscribe()
    this.industrySubscription?.unsubscribe()
    this.dataUserSubscription?.unsubscribe()
    this.updateUserSubscription?.unsubscribe()
    this.chagenPasswordSubcription?.unsubscribe()
  }
}
