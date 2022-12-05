import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LazyLoadEvent } from "primeng/api";
import { Report } from "projects/interface/report";
import { ReportService } from "projects/memberarea/src/app/service/report.service";
import { Subscription } from "rxjs";
@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html",
    providers: [
        DatePipe
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
    checkboxChanged(event : any) {
        // const id = event.source.id; //Get the id of the checkbox
        // console.log(event.checked); //true or false
        // console.log(id); //A, B, C... etc
        // if (event.checked) this.userId.push(id); //If checked, add to array
        // else { //if unchecked, remove from the array
        //     // const i = this.userId.indexOf(id);
        //     // this.userId.splice(i, 1);
         
        // }
        console.log(event);
        
        console.log("tempData", this.userId); 
    }
    toggleCheckBox(elementId : any){
        // return (this.userId.indexOf(elementId) != -1) ? true : false;
        console.log(elementId);
        
    }
    
    sendRegretMail(id : any) {
        // this.selection.forEach(s => {
        //   console.log(s.id);
        this.userIDs.push(id); // Just push object of id with define array
   
     
        // });
        // this.data.patchValue({
        //     userId : this.userIDs.push(id)
        // })

        // this.userId.push(this.fb.group([]))
        console.log(id);
        
        console.log(this.userIDs);
        
    }
    

    getData(offset: number, limit: number){
     
        this.getAllIncomeSuperAdminSubscription = this.reportService.getAllSuperAdminRevenueReport(offset, limit).subscribe(result=>{
            for(let i=0;i<result.length;i++){
                this.reportIncome.push(result[i])
            }
        })
    }

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
        return this.data.get([]) as FormArray
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
            endDate : this.datePipe.transform(this.dateRanges[1], 'yyyy-MM-dd')
        })
        // if (this.dateRanges[0] != null && this.dateRanges[1] != null) {
        //     this.insertIncomeIncomeMemberSubscription = this.reportService.reportMemberRevenueReport(this.date.value).subscribe((result) => {
        //         const anchor = document.createElement('a');
        //         anchor.download = "report_income.pdf";
        //         anchor.href = (window.webkitURL || window.URL).createObjectURL(result.body as any);
        //         anchor.click();
        //     })
        // } else {
        //     this.toast.warning('input range date')
        // } 
       
        
    }

    ngOnDestroy(): void {
        this.getAllIncomeSuperAdminSubscription?.unsubscribe()
        this.getMemberIncomeSuperAdminSubscription?.unsubscribe()
        this.insertIncomeSuperAdminSubscription?.unsubscribe()
    }

}