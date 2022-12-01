import { Component, OnInit } from '@angular/core';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { Subscription } from 'rxjs'
import {Position} from '../../../../../../../interface/position'
import {Industry} from '../../../../../../../interface/industry'
import { BASE_URL } from 'projects/constant/BaseUrl';
import { User } from 'projects/interface/user';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder , Validators} from '@angular/forms';
@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
})
export class UpdateUsersComponent implements OnInit {
 
  private updateUserSubscription? : Subscription
  private getUserByIdSubscription?: Subscription
  private positionsSubscription?: Subscription
  private industrySubscription?: Subscription
  resultExtension!: string
  resultFile !: string
  positions: any[] = []
  industries: any[] = []
  role: any[] = []
  dataUser : any = new Object
  dataPosition : Position[] = []
  dataIndustry: Industry[] = []
  selectedidPosition : string = ''
  selectedidIndustry: string = ''
  selectedRole: string = ''
  dataPhoto = this.fb.group({
    photo: this.fb.group({
      fileEncode: [''],
      fileExtensions : ['']
    })
  })
  dataUpdate = this.fb.group({
    id: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    role: this.fb.group({
      id : ['', [Validators.required]]
    }),
    userType: this.fb.group({
      id : ['', [Validators.required]]
    }),
    company: ['', [Validators.required]],
    industry: this.fb.group({
      id : ['', [Validators.required]]
    }),
    position: this.fb.group({
      id : ['', [Validators.required]]
    }),
    phoneNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    userSocmed: this.fb.group({
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      linkedin : ['', [Validators.required]]
    }),
    isActive: [true, [Validators.required]],
    version: [0, [Validators.required]]
    
  })
  constructor(
    private fb : FormBuilder ,
    private userService: UsersService,
    private positionService: PositionService,
    private industryService: IndustryService,
    private activedParam: ActivatedRoute) { }
 
  ngOnInit(): void {

    this.getUserByIdSubscription = this.activedParam.params.subscribe(id => {
      
      this.userService.getUsersById(String(Object.values(id))).subscribe(result => {
        this.dataUser = result
        this.dataUpdate.patchValue({
          id: result.id,
          fullname: result.fullname,
          email: result.email,
          role: {
            id : result.role.id
          },
          userType: {
            id : result.userType.id
          },
          industry: {
            id : result.industry.id
          },
          position: {
            id : result.position.id
          },
          userSocmed: {
            facebook: result.userSocmed.facebook,
            instagram: result.userSocmed.instagram,
            linkedin : result.userSocmed.linkedin
          },
          dateOfBirth : result.dateOfBirth,
          phoneNumber: result.phoneNumber,
          address: result.address,
          company : result.company,
          isActive: result.isActive,
          version : result.version
        })
        console.log(result);

      })
    })
    this.role = [
      {name: 'Super Admin', id: 'ROLSA'},
      {name: 'Admin', id: 'ROLAM'},
      {name: 'Members', id: 'ROLMM'}
    ]

    this.getAllIndustry()
    this.getAllPosition()

  }

  update() {
    this.updateUserSubscription = this.userService.updateProfile(this.dataUpdate.value).subscribe(result => {
        
    })
   
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

  getAllRole() {
    this.role = [
      {name: 'Super Admin', id: 'ROLSA'},
      {name: 'Admin', id: 'ROLAM'},
      {name: 'Members', id: 'ROLMM'}
    ]
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
      this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
      this.resultExtension = result.split(";")[0].split('/')[1]
           
    })
  }


  ngOnDestroy(): void {
    this.industrySubscription?.unsubscribe()
    this.positionsSubscription?.unsubscribe()
    this.getUserByIdSubscription?.unsubscribe()
    this.updateUserSubscription?.unsubscribe()
  }



}
