import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, LazyLoadEvent, MessageService } from "primeng/api";
import { Report } from "projects/interface/report";
import { ReportService } from "projects/memberarea/src/app/service/report.service";
import { Subscription,finalize } from "rxjs";


@Component({
    selector: "report-member",
    templateUrl: "./report-member.component.html",
    providers: [
        DatePipe,MessageService,ConfirmationService
    ],
})
export class ReportMemberComponent implements OnInit,OnDestroy {
    private getAllParticipantSuperAdminSubscription?: Subscription
    private getMemberParticipantSuperAdminSubscription?: Subscription
    private insertParticipantSuperAdminSubscription? : Subscription
    dateRanges : any [] = []
    first = 0
    rows = 10
    loaderButton : boolean = false
    reportParticipant: Report[] = []
    dataReport: Report[] = []
    selection: any[] = [];
    userIDs: any[] = []
    data = this.fb.group({
        startDate : [''],
        endDate: [''],
        userId: this.fb.array([
        ]),
    })
    constructor(private toast: ToastrService, private reportService: ReportService,
        private fb: FormBuilder, private datePipe: DatePipe,private title : Title) {
            this.title.setTitle('Report Participants')
         }
    
    ngOnInit(): void {
        this.init()
    }

    init(){
        this.getAllParticipantSuperAdminSubscription = this.reportService.getAllSuperAdminParticipantReport(this.first,this.rows).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportParticipant.push(result[i])
            }           
        })     
    }

    getData(offset: number, limit: number){
     
        this.getAllParticipantSuperAdminSubscription = this.reportService.getAllSuperAdminParticipantReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportParticipant.push(result[i])
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
       
        this.userIDs.length= 0
        for(let i =0; i<this.selection.length;i++){
            this.userIDs.push(this.selection[i].memberId)
        }
        console.log(this.userIDs)
        this.data.patchValue({
            startDate: this.datePipe.transform(this.dateRanges[0], 'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.dateRanges[1], 'yyyy-MM-dd'),
        })
        this.data.value.userId = this.userIDs
        if (this.dateRanges[0] != null && this.dateRanges[1] != null) {
            if (this.userIDs.length > 0) {
                this.loaderButton = true
                this.insertParticipantSuperAdminSubscription = this.reportService.reportSuperAdminPartipants(this.data.value).pipe(finalize(()=> this.loaderButton = false)).subscribe((result) => {
                    const anchor = document.createElement('a');
                    anchor.download = "report_participant.pdf";
                    anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
                    anchor.click();
                })
            } else {
                this.toast.warning('Select Members')
            }
           
        } else {
            this.toast.warning('input range date')
        } 
       
       
    }

    ngOnDestroy(): void {
        this.getAllParticipantSuperAdminSubscription?.unsubscribe()
        this.getMemberParticipantSuperAdminSubscription?.unsubscribe()
        this.insertParticipantSuperAdminSubscription?.unsubscribe()
    }

}