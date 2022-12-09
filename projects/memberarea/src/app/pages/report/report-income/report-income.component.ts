import { Component, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription,finalize } from "rxjs";
import { ReportService } from "../../../service/report.service";
import { DatePipe } from '@angular/common';
import { Report } from "projects/interface/report";
import { LazyLoadEvent } from "primeng/api"
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";
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
    private insertIncomeIncomeMemberSubscription?: Subscription
    private getDataCount?: Subscription
    first = 0
    rows = 10
    totalMember: number = 0
    loadertable: boolean =  true
    loaderButton: boolean = false
    reportIncome: any[] = []
    dateRanges: any[] = []
    dataReport : Report[] = []
    date = this.fb.group({
        startDate : ['',[Validators.required]],
        endDate : ['',[Validators.required]]
    })

  
    constructor(private title: Title, private toast: ToastrService, private reportService: ReportService, private fb: FormBuilder, private datePipe: DatePipe) {
        this.title.setTitle('Report Income')
    }
    ngOnInit(): void {
        this.init()
    }

    init(){
        this.getAllIncomeMemberSubscription = this.reportService.getAllMemberRevenueReport(this.first, this.rows).pipe(finalize(()=> this.loadertable = false)).subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                this.reportIncome.push(result[i])
             }
        
          })
          this.getDataCount = this.reportService.countReportRevenueMember().subscribe(result => {
              this.totalMember = result.totalRow
          })
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

    btnExport() {
        this.loaderButton = true
        this.date.patchValue({
            startDate: this.datePipe.transform(this.dateRanges[0], 'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.dateRanges[1], 'yyyy-MM-dd')
        })
        if (this.dateRanges[0] != null && this.dateRanges[1] != null) {
            this.insertIncomeIncomeMemberSubscription = this.reportService.reportMemberRevenueReport(this.date.value).pipe(finalize(() => this.loaderButton = false)).subscribe((result) => {
                this.loaderButton = false
                const anchor = document.createElement('a');
                anchor.download = "report_income.pdf";
                anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
                anchor.click();
            })
        } else {
            this.toast.warning('input range date')
        } 
       
        
    }

    ngOnDestroy(): void {
        this.getAllIncomeMemberSubscription?.unsubscribe()
        this.getMemberIncomeMemberSubscription?.unsubscribe()
        this.insertIncomeIncomeMemberSubscription?.unsubscribe()
        this.getDataCount?.unsubscribe()
    }

}