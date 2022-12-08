import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { Report } from "projects/interface/report";
import { LazyLoadEvent } from "primeng/api"
import { ToastrService } from "ngx-toastr";
import { ReportService } from "../../../service/report.service";
@Component({
    selector: "report-participant",
    templateUrl: "./report-participant.component.html",
    providers: [
        DatePipe
      ],
})
export class ReportMemberComponent implements OnInit,OnDestroy{
    private getAllParticipantMemberSubscription?: Subscription
    private getMemberParticipantMemberSubscription?: Subscription
    private insertParticipantMemberSubscription? : Subscription
    loaderButton : boolean = false
    first = 0
    rows = 10
    reportParticipant: any[] = []
    dateRangesParticipant: any[] = []
    dataReport : Report[] = []
    date = this.fb.group({
       
        startDate : [''],
        endDate : ['']
    })

  
    constructor(private toast : ToastrService,private reportService: ReportService,private fb : FormBuilder,private datePipe: DatePipe) { }
    
    ngOnInit(): void {
        this.init()
    }

    init(){
    
        this.getAllParticipantMemberSubscription = this.reportService.getAllProductivityReport(this.first,this.rows).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportParticipant.push(result[i])
            }
        })     
    }

    getData(offset: number, limit: number){
        this.getAllParticipantMemberSubscription = this.reportService.getAllProductivityReport(offset, limit).subscribe(result=>{
            for (let i = 0; i < result.length; i++){
                this.reportParticipant.push(result[i])
            }
        })
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }



    btnExportParticipant() {
        this.loaderButton = true
        this.date.patchValue({
            startDate: this.datePipe.transform(this.dateRangesParticipant[0], 'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.dateRangesParticipant[1], 'yyyy-MM-dd')
        })
        if (this.dateRangesParticipant[0] != null && this.dateRangesParticipant[1] != null) {
            this.insertParticipantMemberSubscription = this.reportService.reportMemberProductivityReportData(this.date.value).subscribe((result) => {
                this.loaderButton = false
                const anchor = document.createElement('a');
                anchor.download = "report_participant.pdf";
                anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
                anchor.click();
            })
        } else {
            this.toast.warning('input range date')
        } 
               
    }

    ngOnDestroy(): void {
        this.getAllParticipantMemberSubscription?.unsubscribe()
        this.getMemberParticipantMemberSubscription?.unsubscribe()
        this.insertParticipantMemberSubscription?.unsubscribe()
    }

}