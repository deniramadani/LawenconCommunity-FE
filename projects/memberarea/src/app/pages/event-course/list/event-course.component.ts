import { Component, OnDestroy, OnInit } from '@angular/core';
import  { Subscription } from 'rxjs'
import { ProductsService } from '../../../service/products.service';
import { Schedule } from '../../../../../../interface/schedule'
import { BASE_URL } from 'projects/api/BaseUrl';
import { FormBuilder,Validators } from '@angular/forms';
import { UserTypeService } from '../../../service/user.type.service';
import { UserType } from "../../../../../../interface/user-type";
import { Router } from '@angular/router';
import { ProductTypeService } from '../../../service/product.type.service';
import { ProductType } from 'projects/interface/product-type';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-event-course',
  templateUrl: './event-course.component.html',

})
export class EventCourseComponent implements OnInit,OnDestroy {
  private getAllEventSubscription? : Subscription
  private getAllCourseSubscription?: Subscription
  private getAllProductTypeSubscription?: Subscription
  private insertProductSubscription? : Subscription
  dataEvent : Schedule[]= []
  dataCourse: Schedule[] = []
  showFormInsert: boolean = false;
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  productType: any[] = []
  dataProductType: ProductType[] = []
  resultExtension!: string
  resultFile !: string
  startDate: string = ''
  endDate : string =''
  productTypes : any [] = []
  selectedProductType : string = ''
  dataInsert = this.fb.group({
    dateTimeStart: ['',[Validators.required]],
    dateTimeEnd : ['',[Validators.required]],
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
  constructor(private router : Router,private productTypeService : ProductTypeService,private productService : ProductsService,private fb : FormBuilder) { }
  

  ngOnInit(): void {

    this.getAllProductTypeSubscription = this.productTypeService.getAllProductType().subscribe(result => {
      this.dataProductType = result
      for (let i = 0; i < result.length ; i++) {
        this.productTypes.push({
            id : this.dataProductType[i].id,
            productTypeName: this.dataProductType[i].productTypeName,
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

  getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  showInsertProduct() {
    this.showFormInsert = true;
  }
  closeForm() {
    this.showFormInsert = false
  }
  insert() {
  //   function getTimeZone() {
  //     var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
      
  //     return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  //   }

  // this.dataInsert.controls.dateTimeStart.setValue(formatDate(this.dataInsert.value.dateTimeStart ?? '', `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'))
  // this.dataInsert.controls.dateTimeEnd.setValue(formatDate(this.dataInsert.value.dateTimeEnd ?? '', `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'))
    this.insertProductSubscription = this.productService.insertProduct(this.dataInsert.value).subscribe(result => {
      this.showFormInsert = false
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
    this.getAllProductTypeSubscription?.unsubscribe()
    this.insertProductSubscription?.unsubscribe()

  }
}
