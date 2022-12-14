import { Component, OnDestroy, OnInit } from '@angular/core';
import  { Subscription } from 'rxjs'
import { ProductsService } from '../../../service/products.service';
import { Schedule } from '../../../../../../interface/schedule'
import { BASE_URL } from 'projects/constant/BaseUrl';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductTypeService } from '../../../service/product.type.service';
import { ProductType } from 'projects/interface/product-type';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
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
  endDate: string = ''
  productTypes : any [] = []
  selectedProductType: string = ''
  result : string = ''
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
  constructor(private toast: ToastrService, private productTypeService: ProductTypeService,
    private productService: ProductsService, private fb: FormBuilder, private title: Title) { 
    this.title.setTitle('Events & Courses')
     }
  

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getAllProductTypeSubscription = this.productTypeService.getAllProductType().subscribe(result => {
      this.dataProductType = result
      for (let i = 0; i < result.length ; i++) {
        this.productTypes.push({
            id : this.dataProductType[i].id,
            productTypeName: this.dataProductType[i].productTypeName,
        })
      }
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
    if (this.result != '') {
      function getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      }
  
      this.dataInsert.patchValue({
        dateTimeStart: formatDate(this.dataInsert.value.dateTimeStart!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'),
        dateTimeEnd : formatDate(this.dataInsert.value.dateTimeEnd!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en')
      })
    
      this.insertProductSubscription = this.productService.insertProduct(this.dataInsert.value).subscribe(result => {
        this.showFormInsert = false
        this.init()
      })
    } else {
      this.toast.warning('please upload image')
    }
   
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
      this.result = result
      this.resultFile = result.substring(result.indexOf(",") + 1, result.length)
      this.resultExtension = result.split(";")[0].split('/')[1]
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
