import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder,Validators } from '@angular/forms';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { Schedule } from 'projects/interface/schedule';
import { Subscription } from "rxjs";
import { PostingService } from '../../../service/posting.service';
import { ProductTypeService } from '../../../service/product.type.service';
import { ProductType } from "../../../../../../interface/product-type";
import { formatDate } from '@angular/common';
import { ProductsService } from '../../../service/products.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',

})
export class ActivitiesComponent implements OnInit,OnDestroy {
  private getEventByUserIdSubscription?: Subscription
  private getCourseByUserIdSubscription?: Subscription
  private getAllProductTypeSubscription?: Subscription
  private updateProductSubscription?:Subscription
  dataCourse: Schedule[] = []
  dataEvent: Schedule[] = []
  productType: ProductType[] = []
  start = 0
  selectedProductType : string = ''
  limit = 4
  dataProductType: ProductType[] = []
  displayFormUpdate : boolean = false
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  seeMore: boolean = false
  label : string = ''
  dataUpdate = this.fb.group({
    id : ['',[Validators.required]],
    dateTimeStart: ['',[Validators.required]],
    dateTimeEnd : ['',[Validators.required]],
    product: this.fb.group({
      id : ['',[Validators.required]],
      title: ['',[Validators.required]],
      content: ['',[Validators.required]],
      provider: ['',[Validators.required]],
      location: ['', [Validators.required]],
      price : [0],
      productType: this.fb.group({
        id : this.selectedProductType
      }),
      photo: this.fb.group({
        fileEncode: [''],
        fileExtensions : ['']
      }),
      ownerId: this.fb.group({
        id : ['']
      })
    })
  })
  constructor(private productService : ProductsService,private postService : PostingService,private fb : FormBuilder,private productTypeService : ProductTypeService) { }
  
  ngOnInit(): void {
  
    this.onInit()
  }

  onInit() {
    this.initGetEvent()
    this.initGetCourse()
   

    this.getAllProductTypeSubscription = this.productTypeService.getAllProductType().subscribe(result => {
      this.dataProductType = result
      for (let i = 0; i < result.length; i++) {
        this.productType.push(result[i])
      }
    })
  }

  initGetEvent() {
    this.getEventByUserIdSubscription = this.productService.getProductEventByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataEvent = result
    })
  }

  initGetCourse() {
    this.getCourseByUserIdSubscription = this.productService.getProductCourseByOwnerId(this.start,this.limit).subscribe(result => {
      this.dataCourse = result
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
          product: {
            photo: {
              fileEncode: result.substring(result.indexOf(",") + 1, result.length),
              fileExtensions:  result.split(";")[0].split('/')[1]
            }
          }
        });
      
    })
  }

  update() {
    function getTimeZone() {
      var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
      return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
    }

    this.dataUpdate.patchValue({
      dateTimeStart: formatDate(this.dataUpdate.value.dateTimeStart!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en'),
      dateTimeEnd : formatDate(this.dataUpdate.value.dateTimeEnd!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en')
    })
  
    this.updateProductSubscription = this.productService.updateProduct(this.dataUpdate.value).subscribe(result => {
      this.displayFormUpdate = false
      this.initGetEvent()
    })
  }

  showFormUpdate(type: string, i: any) {
    this.displayFormUpdate = true
    this.label = type
    if (type === 'Event') {
      this.dataUpdate.patchValue({
        id : this.dataEvent[i].id,
        dateTimeStart: this.dataEvent[i].dateTimeStart,
        dateTimeEnd: this.dataEvent[i].dateTimeEnd,
        product: {
          id : this.dataEvent[i].product.id,
          title: this.dataEvent[i].product.title,
          content: this.dataEvent[i].product.content,
          provider: this.dataEvent[i].product.provider,
          location: this.dataEvent[i].product.location,
          price : this.dataEvent[i].product.price,
          productType: {
            id : this.selectedProductType
          },
          photo: {
            fileEncode: this.dataEvent[i].product.photo.fileEncode,
            fileExtensions :this.dataEvent[i].product.photo.fileExtensions
          },
          ownerId: {
            id : this.dataEvent[i].product.ownerId.id
          }
        },
      })
    } else {
      this.dataUpdate.patchValue({
        id : this.dataCourse[i].id,
        dateTimeStart: this.dataCourse[i].dateTimeStart,
        dateTimeEnd: this.dataCourse[i].dateTimeEnd,
        product: {
          id : this.dataCourse[i].product.id,
          title: this.dataCourse[i].product.title,
          content: this.dataCourse[i].product.content,
          provider: this.dataCourse[i].product.provider,
          location: this.dataCourse[i].product.location,
          price : this.dataCourse[i].product.price,
          productType: {
            id : this.selectedProductType
          },
          photo: {
            fileEncode: this.dataCourse[i].product.photo.fileEncode,
            fileExtensions :this.dataCourse[i].product.photo.fileExtensions
          },
          ownerId: {
            id : this.dataCourse[i].product.ownerId.id
          }
        },
      })
    }
   
   


  }

  onScroll() {
    this.start += this.limit
  }
  
  ngOnDestroy(): void {
    this.getCourseByUserIdSubscription?.unsubscribe()
    this.getEventByUserIdSubscription?.unsubscribe()
    this.updateProductSubscription?.unsubscribe()
    this.getAllProductTypeSubscription?.unsubscribe()
  }
}
