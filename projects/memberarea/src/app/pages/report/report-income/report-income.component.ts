import { Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ReportService } from "../../../service/report.service";
import { DatePipe } from '@angular/common';
import { Report } from "projects/interface/report";
import { LazyLoadEvent } from "primeng/api"
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
        this.init()
    }

    init(){
    
        this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(this.first,this.rows).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }
        })     
        console.log(this.reportIncome);
        
    }

    getData(offset: number, limit: number){
     
        this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }
        })
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    getValueDate() {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
          
            this.date.patchValue({
                startDate: this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
            })
            console.log(this.date.value);
            
            this.getMemberIncomeMemberSubscription = this.reportService.getMemberRevenueReportData(this.date.value).subscribe(result => {
                this.dataReport = result 
                for (let i = 0; i < result.length ; i++) {
                    for(let i=0;i<result.length;i++){
                        this.reportIncome.push(result[i])
                    }
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
            this.insertIncomeIncomeMemberSubscription = this.reportService.reportMemberRevenueReport(this.date.value).subscribe((result: Blob) => {
                const  downloadUrl = URL.createObjectURL(result) 
                window.open(downloadUrl)
            })
        } 
    }

    ngOnDestroy(): void {
        this.getAllIncomeMemberSubscription?.unsubscribe()
    }


    // ngOnInit(): void {
    //     this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(0,10).subscribe(result => {
    //         this.dataReport = result 
    //         for (let i = 0; i < result.length ; i++) {
    //             this.reportIncome.push({
    //                 type : this.dataReport[i].type,
    //                 title: this.dataReport[i].title,
    //                 totalIncome : this.dataReport[i].totalIncome
    //             })
    //         }
            
    //     })
    // }

   


    // ngOnDestroy(): void {
    //     this.getAllIncomeMemberSubscription?.unsubscribe()
    //     this.insertIncomeIncomeMemberSubscription?.unsubscribe()
    //     this.getMemberIncomeMemberSubscription?.unsubscribe()
    // }

  

   
}