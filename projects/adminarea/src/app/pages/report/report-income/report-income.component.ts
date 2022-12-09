import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LazyLoadEvent } from "primeng/api";
import { Report } from "projects/interface/report";
import { ReportService } from "projects/memberarea/src/app/service/report.service";
import { Subscription,finalize } from "rxjs";

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html",
    providers: [
        DatePipe,MessageService,ConfirmationService
    ],
})
export class ReportIncomeComponent implements OnInit,OnDestroy {
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
    loaderButton : boolean = false
    data = this.fb.group({
        startDate : [''],
        endDate: [''],
        userId: this.fb.array([
        ]),
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

    getData(offset: number, limit: number){
     
        this.getAllIncomeSuperAdminSubscription = this.reportService.getAllSuperAdminRevenueReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }
        })
    }

    get userId(): FormArray {
        return this.data.get([]) as FormArray
    }

    checkBoxId() {
        this.userId.push(this.fb.array([]))
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    btnExport() {
        this.loaderButton = true
        this.userIDs.length= 0
        for(let i =0; i<this.selection.length;i++){
            this.userIDs.push(this.selection[i].memberId)
        }
        this.data.patchValue({
            startDate: this.datePipe.transform(this.dateRanges[0], 'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.dateRanges[1], 'yyyy-MM-dd'),
        })
        this.data.value.userId = this.userIDs
        if (this.dateRanges[0] != null && this.dateRanges[1] != null) {
            this.insertIncomeSuperAdminSubscription = this.reportService.reportSuperAdminIncome(this.data.value).pipe(finalize(()=>this.loaderButton = false)).subscribe((result) => {
                const anchor = document.createElement('a');
                anchor.download = "report_income.pdf";
                anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
                anchor.click();
                this.loaderButton = false
            })
        } else {
            this.toast.warning('input range date')
        } 
       
        
    }

    ngOnDestroy(): void {
        this.getAllIncomeSuperAdminSubscription?.unsubscribe()
        this.getMemberIncomeSuperAdminSubscription?.unsubscribe()
        this.insertIncomeSuperAdminSubscription?.unsubscribe()
    }
}