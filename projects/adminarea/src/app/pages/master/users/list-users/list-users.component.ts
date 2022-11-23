import { Component, OnInit } from '@angular/core';
import { User} from '../../../../../../../interface/user'
import { Subscription } from 'rxjs'
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {

  private getAllSubscription?: Subscription
  
  dataUsers : User[] = []
  users: any[] = []
  page :number = 1
  constructor(private userService : UsersService) { }
  

  ngOnInit(): void {
    this.getAllSubscription = this.userService.getAllUsers(0,10).subscribe(result => {
      this.dataUsers = result
      
      for (let i = 0; i < result.length; i++) {
         const index = i+1
          this.users.push({
              no : index,
              id : this.dataUsers[i].id,
            fullname: this.dataUsers[i].fullname,
            email: this.dataUsers[i].email,
            company: this.dataUsers[i].company,
            // industry : this.dataUsers[i].industry.industryName
          })
        }
        console.log(result);
    })
  }
  

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }

}
