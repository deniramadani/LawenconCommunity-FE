import { Component, OnInit } from '@angular/core';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { finalize, Subscription } from 'rxjs'
import {Position} from '../../../../../../../interface/position'
import {Industry} from '../../../../../../../interface/industry'
import { BASE_URL } from 'projects/constant/BaseUrl';
import { User } from 'projects/interface/user';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder , Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  providers: [
    DatePipe
  ],
})
export class UpdateUsersComponent implements OnInit {
 
  private updateUserSubscription? : Subscription
  private getUserByIdSubscription?: Subscription
  private positionsSubscription?: Subscription
  private industrySubscription?: Subscription
  loaderButton: boolean = false
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
  myDate: any 
  bod: any
  fotoId : string = ''
  selectedPosition: any 
  selectedIndustry: any 
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
    isActive: [true, [Validators.required]],    
  })


  constructor(
    private fb : FormBuilder ,
    private userService: UsersService,
    private datePipe: DatePipe,
    private positionService: PositionService,
    private industryService: IndustryService,
    private activedParam: ActivatedRoute) { }
 
  ngOnInit(): void {

    this.getUserByIdSubscription = this.activedParam.params.subscribe(id => {
      
      this.userService.getUsersById(String(Object.values(id))).subscribe(result => {
        console.log(result);        
        this.bod = result.dateOfBirth
      
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
   
     
          this.dataUpdate.patchValue({
            id : result.id,
            fullname: result.fullname,
            email: result.email,
            company: result.company,
            address: result.address,
            phoneNumber: result.phoneNumber,
            userType: {
              id : result.userType.id
            },
            isActive: result.isActive,
            dateOfBirth : result.dateOfBirth,
          })

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
    if (this.bod != null) {
      this.dataUpdate.patchValue({
        dateOfBirth : this.bod
      })
    }
    this.loaderButton = true
    this.updateUserSubscription = this.userService.updateProfile(this.dataUpdate.value).pipe(finalize(() => this.loaderButton = false)).subscribe(result => { 
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
