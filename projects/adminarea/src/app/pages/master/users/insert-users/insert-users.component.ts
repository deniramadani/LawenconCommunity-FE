import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndustryService } from 'projects/mainarea/src/app/service/industry.service';
import { PositionService } from 'projects/mainarea/src/app/service/position.service';
import { finalize, Subscription } from 'rxjs'
import {Position} from '../../../../../../../interface/position'
import {Industry} from '../../../../../../../interface/industry'
import {DatePipe} from '@angular/common';
import { FormBuilder ,Validators } from '@angular/forms';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-insert-users',
  templateUrl: './insert-users.component.html',
  providers: [ DatePipe ]
})
export class InsertUsersComponent implements OnInit,OnDestroy {
 

  private insertUsersSubscription? : Subscription
  private positionsSubscription?: Subscription
  private industrySubscription?: Subscription
  resultExtension!: string
  resultFile !: string
  loaderButton: boolean = false
  positions: any[] = []
  industries: any[] = []
  role: any[] = []
  dataPosition : Position[] = []
  dataIndustry: Industry[] = []
  bod : string =''
  selectedidPosition : string = ''
  selectedidIndustry: string = ''
  selectedRole: string = ''
  dataInsert = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: this.fb.group({
      roleCode : this.selectedRole
    }),

    photo: this.fb.group({
      fileEncode: [''],
      fileExtensions : ['']
    }),
    company: [''],
    industry: this.fb.group({
      id : this.selectedidIndustry
    }),
    position: this.fb.group({
      id : this.selectedidPosition
    }),
    phoneNumber: [''],
    address: [''],
    dateOfBirth: this.bod,
    userSocmed: this.fb.group({
      facebook: [''],
      instagram: [''],
      linkedin : ['']
    }),
  })
  constructor(private router : Router ,private userService : UsersService,private fb : FormBuilder ,private positionService : PositionService,private industryService : IndustryService ) { }
 
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

    this.role = [
        {name: 'Super Admin', id: 'ROLSA'},
        {name: 'Admin', id: 'ROLAM'},
        {name: 'Members', id: 'ROLMM'}
    ]

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

  insertUser() {
    this.dataInsert.patchValue({
      photo: {
        fileEncode: this.resultFile,
        fileExtensions: this.resultExtension
      }
    });
    this.loaderButton = true
    this.insertUsersSubscription = this.userService.insertUser(this.dataInsert.value).pipe(finalize(() => this.loaderButton = false)).subscribe(result => {
        this.router.navigateByUrl('/master/users')
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
      this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
      this.resultExtension = result.split(";")[0].split('/')[1]
      console.log(result);
      
    })
  }

  ngOnDestroy(): void {
    this.industrySubscription?.unsubscribe()
    this.positionsSubscription?.unsubscribe()
    this.insertUsersSubscription?.unsubscribe()
  }

}
