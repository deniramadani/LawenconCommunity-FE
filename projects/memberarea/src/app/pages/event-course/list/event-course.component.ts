import { Component, OnDestroy, OnInit } from '@angular/core';
import  { Subscription } from 'rxjs'
import { ProductsService } from '../../../service/products.service';
import { Schedule } from '../../../../../../interface/schedule'
import { BASE_URL } from 'projects/api/BaseUrl';
import { FormBuilder,Validators } from '@angular/forms';
import { UserTypeService } from '../../../service/user.type.service';
import { UserType } from "../../../../../../interface/user-type";
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-course',
  templateUrl: './event-course.component.html',

})
export class EventCourseComponent implements OnInit,OnDestroy {
  private getAllEventSubscription? : Subscription
  private getAllCourseSubscription?: Subscription
  private getAllUserTypeSubscription?: Subscription
  private insertProductSubscription? : Subscription
  dataEvent : Schedule[]= []
  dataCourse: Schedule[] = []
  showFormInsert: boolean = false;
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  productType: any[] = []
  dataUserType: UserType[] = []
  resultExtension!: string
  resultFile !: string
  usertypes : any [] = []
  selectedProductType : string = ''
  dataInsert = this.fb.group({
    dateTimeStart: [''],
    dateTimeEnd : [''],
    product: this.fb.group({
      title: ['',[Validators.required]],
      content: ['',[Validators.required]],
      provider: ['',[Validators.required]],
      location: ['',[Validators.required]],
      price: [0],
      productType: this.fb.group({
        id : this.selectedProductType
      }),
      photo: this.fb.group({
        fileEncode: [''],
        fileExtensions : ['']
      }),
    })
  })
  constructor(private router : Router,private userTypeService : UserTypeService,private productService : ProductsService,private fb : FormBuilder) { }
  

  ngOnInit(): void {

    this.getAllUserTypeSubscription = this.userTypeService.getAllUserType().subscribe(result => {
      this.dataUserType = result
      for (let i = 0; i < result.length ; i++) {
        this.usertypes.push({
            id : this.dataUserType[i].id,
          userTypeCode: this.dataUserType[i].userTypeCode,
          userTypeName : this.dataUserType[i].userTypeName
        })
      }
      console.log(result);
      
    })

    this.productType = [
      {name: 'Event', id: 'ROLSA'},
      {name: 'Course', id: 'ROLAM'},
    ]
    
    this.getAllEventSubscription = this.productService.getAllEvents(0,3).subscribe(result => {
      this.dataEvent = result      
    })

    this.getAllCourseSubscription = this.productService.getAllCourses(0,3).subscribe(result => {
      this.dataCourse = result      
    })
  }

  showInsertProduct() {
    this.showFormInsert = true;
  }
  closeForm() {
    this.showFormInsert = false
  }
  insert() {
   

    this.insertProductSubscription = this.productService.insertProduct(this.dataInsert.value).subscribe(result => {
      this.router.navigateByUrl('/events-courses')
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
       this.dataInsert.patchValue({
          product: {
            photo: {
              fileEncode: result.substring(result.indexOf(",") + 1, result.length),
              fileExtensions:  result.split(";")[0].split('/')[1]
            }
          }
        });
      
    })
  }



  ngOnDestroy(): void {
   this.getAllEventSubscription?.unsubscribe()
    this.getAllCourseSubscription?.unsubscribe()
    this.getAllUserTypeSubscription?.unsubscribe()
  }
}
