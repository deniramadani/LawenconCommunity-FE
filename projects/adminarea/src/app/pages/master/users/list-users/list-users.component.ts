import { Component, OnInit } from '@angular/core';
import { User} from '../../../../../../../interface/user'
import { Subscription } from 'rxjs'
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { BASE_URL } from 'projects/constant/BaseUrl';
import { DashboardService } from 'projects/adminarea/src/app/service/dashboard.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  providers: [ConfirmationService]
})
export class ListUsersComponent implements OnInit {

  private getAllSubscription?: Subscription
  private getDataCount?: Subscription
  private pageChangeSubscription?: Subscription
  private deleteUserSubscription?: Subscription
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  dataUsers : User[] = []
  users: User[] = []
  userId : string = ''
  page: number = 1
  first = 0
  rows = 10
  limit = this.rows
  totalUsers!: number
  constructor(private confirmationService: ConfirmationService,private userService : UsersService,private data : DashboardService) { }
  

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getAllSubscription = this.userService.getAllUsers(this.first, this.limit).subscribe(result => {
        this.users = []
        for (let i = 0; i < result.length; i++) {
            this.users.push(result[i])
      }
      console.log(this.users);
      
    })
    this.getDataCount = this.data.getData().subscribe(result => {
        this.totalUsers = result.userTotal
    })
  }

  clickConfirmDelete(position: string, id: string,) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        key: "positionDialog",
        accept: () => {
          this.deleteUserSubscription = this.userService.deleteUser(id).subscribe(result => {
            this.init()
          })
        }
    });
  }

  getData(offset: number, limit: number) {
    this.pageChangeSubscription = this.userService.getAllUsers(offset, limit).subscribe(result => {
        this.users = []
        for (let i = 0; i < result.length; i++) {
            this.users.push(result[i])
        }
    })
  }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first!, event.rows!)
    }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.getDataCount?.unsubscribe()
    this.pageChangeSubscription?.unsubscribe()
    this.deleteUserSubscription?.unsubscribe()
  }

}
