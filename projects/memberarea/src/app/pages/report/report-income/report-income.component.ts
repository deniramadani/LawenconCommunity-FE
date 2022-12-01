import { Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ReportService } from "../../../service/report.service";
import { DatePipe } from '@angular/common';
import { Report } from "projects/interface/report";
@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html",
    providers: [
        DatePipe
      ],
})
export class ReportIncomeComponent implements OnInit, OnDestroy {
    private getAllIncomeMemberSubscription?: Subscription
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
        
    }

   
    getValueDate() {
        if (this.rangeDates[0] == null && this.rangeDates[1] == null) {
            console.log('kosong');
            
        } else {
            this.date.patchValue({
                startDate: this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
            })
            console.log(this.date.value);
            
            this.getAllIncomeMemberSubscription = this.reportService.getMemberRevenueReportData(this.date.value).subscribe(result => {
                this.dataReport = result 
                for (let i = 0; i < result.length ; i++) {
                    this.reportIncome.push({
                        type : this.dataReport[i].type,
                        title: this.dataReport[i].title,
                        totalIncome : this.dataReport[i].totalIncome
                    })
                }
                console.log(this.reportIncome);
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

  

   
}