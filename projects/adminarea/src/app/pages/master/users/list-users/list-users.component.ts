import { Component, OnInit } from '@angular/core';
import { User} from '../../../../../../../interface/user'
import { Subscription } from 'rxjs'
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { BASE_URL } from 'projects/api/BaseUrl';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {

  private getAllSubscription?: Subscription
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  dataUsers : User[] = []
  users: any = []
  page: number = 1
  
  constructor(private userService : UsersService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.userService.getAllUsers(0,100).subscribe(result => {
      this.dataUsers = result
      
      for (let i = 0; i < result.length; i++) {
          this.users.push({
            id : this.dataUsers[i].id,
            fullname: this.dataUsers[i].fullname,
            email: this.dataUsers[i].email,
            company: this.dataUsers[i].company,            
          })
        }
      console.log(this.dataUsers);
      
    })
  }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
