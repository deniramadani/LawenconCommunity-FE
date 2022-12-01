import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ReportService } from "../../../service/report.service";
import { Subscription } from "rxjs";
import { Report } from "projects/interface/report";
import { LazyLoadEvent } from "primeng/api"
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
    first = 0
    rows = 10
    loading: boolean = true
    reportParticipants : any [] = []
    rangeDates: any[] = []
    data: any[] = []
    dataReport : Report[] = []
    date = this.fb.group({
       
        startDate : [''],
        endDate : ['']
    })
    
    constructor(private reportService: ReportService,private fb : FormBuilder,private datePipe: DatePipe){}

   


    ngOnInit(): void {
        this.init()
    }

    init(){
    
        this.getAllParticipantMemberSubscription = this.reportService.getAllProductivityReport(this.first,this.rows).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportParticipants.push(result[i])
            }
        })     
        console.log(this.reportParticipants);
        
    }

    getData(offset: number, limit: number){
     
        this.getAllParticipantMemberSubscription = this.reportService.getAllProductivityReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportParticipants.push(result[i])
            }
        })
    }

    loadData(event: LazyLoadEvent){
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }
    ngOnDestroy(): void {
        this.getAllParticipantMemberSubscription?.unsubscribe()
    }

}