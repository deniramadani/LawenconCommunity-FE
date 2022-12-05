import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LazyLoadEvent } from "primeng/api";
import { Report } from "projects/interface/report";
import { ReportService } from "projects/memberarea/src/app/service/report.service";
import { Subscription } from "rxjs";

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html",
    providers: [
        DatePipe,MessageService,ConfirmationService
    ],
})
export class ReportIncomeComponent implements OnInit {
    private getAllIncomeSuperAdminSubscription?: Subscription
    private getMemberIncomeSuperAdminSubscription?: Subscription
    private insertIncomeSuperAdminSubscription? : Subscription
    dateRanges : any [] = []
    first = 0
    rows = 10
    reportIncome: Report[] = []
    userIdCheckBox: any[] = []
    dataReport: Report[] = []
    selection: any[] = [];

    userIDs: any[] = []
    data = this.fb.group({
        startDate : [''],
        endDate: [''],
        userId: this.fb.array([
        ]),
        // userId : this.selection.selection.map(o => ({id: o.id}));
        // userId :  this.selection.forEach(s => console.log(s))
    })
    constructor(private toast : ToastrService,private reportService: ReportService,private fb : FormBuilder,private datePipe: DatePipe) { }
    
    ngOnInit(): void {
        this.init()
    }

    init(){
        this.getAllIncomeSuperAdminSubscription = this.reportService.getAllSuperAdminRevenueReport(this.first,this.rows).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }           
        })     
    }
  
    checkCheckBoxvalue(event : any){
        console.log(event.target.checked)
        console.log(event);
    }
    
    getValue(event: any,id : string) {
        
        // console.log(event.target.value, id);
        // this.userIDs.push(id)
        // console.log(this.userIDs);

        this.selection.forEach(s => {
            console.log(s);
            
        })
        
        
        // this.selection.forEach(s => {
        //   console.log(s.id);
        // this.userIDs.push(id); // Just push object of id with define array
        // this.userId.push(id)
     

        // this.userId.push(this.fb.group([]))
        // this.data.patchValue({
        //     userId : ['1','2']
        // })
        // console.log(id);
        // this.data.patchValue({
        //     userId : id
        // })
        
        // console.log(this.userIDs);



        
    }
    

    getData(offset: number, limit: number){
     
        this.getAllIncomeSuperAdminSubscription = this.reportService.getAllSuperAdminRevenueReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }
        })
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.report.length; i++) {
    //         if (this.report[i].memberName === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // fileUpload(event: any) {
    //     for (let i = 0; i < event.target.files.length; i++) {
    //       this.fileService.fileUploadMultiple(event, i).then(result => {
    //         this.detailFoto.push(this.fb.group({ fileExtensions: result[0], fileEncode: result[1] }));
    //       })
    //     }    
    //   }
    
    //   get detailFoto(): FormArray {
    //     return this.dataPosting.get('pfile') as FormArray
    //   }

    get userId(): FormArray {
        return this.data.get('userId') as FormArray
    }

    checkBoxId() {
        this.userId.push(this.fb.array([]))
        // this.data.push(this.fb.group({ fileExtensions: result[0], fileEncode: result[1] }));
        // this.data.patchValue({
        //     userId : this.userId.push(this.fb.group({}))
        // })
        // const newUserReq = this.fb.group({
        //     userId: [''],
        // })
        // this.data.push(newUserReq)
        console.log(this.userId.push(this.fb.array([])));
        
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    btnExport() {
              
        this.data.patchValue({
            startDate: this.datePipe.transform(this.dateRanges[0], 'yyyy-MM-dd'),
            endDate: this.datePipe.transform(this.dateRanges[1], 'yyyy-MM-dd'),
        })

        console.log(this.data.value);
        
       
        
    }

    ngOnDestroy(): void {
        this.getAllIncomeSuperAdminSubscription?.unsubscribe()
        this.getMemberIncomeSuperAdminSubscription?.unsubscribe()
        this.insertIncomeSuperAdminSubscription?.unsubscribe()
    }

}