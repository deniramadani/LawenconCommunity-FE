import { Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ReportService } from "../../../service/report.service";
import { DatePipe } from '@angular/common';
import { Report } from "projects/interface/report";
import { LazyLoadEvent } from "primeng/api"
import { HttpResponse } from "@angular/common/http";
import {saveAs as importedSaveAs} from "file-saver";
@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html",
    providers: [
        DatePipe
      ],
})
export class ReportIncomeComponent implements OnInit, OnDestroy {
    private getAllIncomeMemberSubscription?: Subscription
    private getMemberIncomeMemberSubscription?: Subscription
    private insertIncomeIncomeMemberSubscription? : Subscription
    first = 0
    rows = 10
    reportIncome: any[] = []
    rangeDates: any[] = []
    dataReport : Report[] = []
    date = this.fb.group({
       
        startDate : [''],
        endDate : ['']
    })

  
    constructor(private reportService: ReportService,private fb : FormBuilder,private datePipe: DatePipe) { }
    
    ngOnInit(): void {
        // this.init()
    }

    init(){
    
        // this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(this.first,this.rows).subscribe(result=>{
        //     for(let i=0;i<result.length;i++){
        //         this.reportIncome.push(result[i])
        //     }
        // })     
    }

    getData(offset: number, limit: number){
     
        // this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(offset, limit).subscribe(result=>{
        //     for(let i=0;i<result.length;i++){
        //         this.reportIncome.push(result[i])
        //     }
        // })
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        // this.getData(event.first!, event.rows!)
    }

    getValueDate() {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
          
            this.date.patchValue({
                startDate: this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
            })
           
            this.getMemberIncomeMemberSubscription = this.reportService.getMemberRevenueReportData(this.date.value).subscribe(result => {
                this.dataReport = result 
                for (let i = 0; i < result.length ; i++) {
                    this.reportIncome.push(result[i])
                }                
            })
        }
    }

    btnExport() {
        if (this.rangeDates[0] != null && this.rangeDates[1] != null) {
            this.date.patchValue({
                startDate: this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
            })
            this.insertIncomeIncomeMemberSubscription = this.reportService.reportMemberRevenueReport(this.date.value).subscribe((result) => {
                const anchor = document.createElement('a');
                anchor.download = "report.pdf";
                anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
                anchor.click();

            })
        } 
    }

    ngOnDestroy(): void {
        this.getAllIncomeMemberSubscription?.unsubscribe()
        this.getMemberIncomeMemberSubscription?.unsubscribe()
        this.insertIncomeIncomeMemberSubscription?.unsubscribe()
    }

}