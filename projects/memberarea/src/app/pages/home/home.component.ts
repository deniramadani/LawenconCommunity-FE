import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'projects/mainarea/src/app/service/api.service';
import { UsersService } from 'projects/mainarea/src/app/service/users.service';
import { Subscription } from 'rxjs'
import { ArticleService } from '../../service/article.service';
import { Article } from '../../../../../interface/article';
import { BASE_URL } from 'projects/api/BaseUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit,OnDestroy {
  private getAllUserSubscription? : Subscription
  private getAllArticleSubscription? : Subscription
  fileDownload = `${BASE_URL.BASE_URL}/files/download/`
  fileid : string = ''
  data: Article[] = [];
  fullname : string =''
  position : string =''
  email : string = ''
  phoneNumber : string = ''
  age : string = ''
  fotoProfile : string = ''
 
  constructor(private articleService : ArticleService,private router : Router,private apiService : ApiService , private userService : UsersService){}

  ngOnInit(): void {
    const id = this.apiService.getIdUser()
    this.getAllUserSubscription = this.userService.getAllUsersById(String(id)).subscribe(result => {
      this.fullname = result.fullname
      this.email = result.email
      if(result.position.positionName != null){
        this.position = result.position.positionName
      }else{
        this.position = '-'
      }

      if(result.phoneNumber != null){
        this.phoneNumber = result.phoneNumber
      }else{
        this.phoneNumber = '-'
      }

      if(result.dateOfBirth != null){
        this.age = `${ String(this.getAge(result.dateOfBirth))} tahun`
      }else{
        this.age = '-'
      }

      this.fotoProfile = result.photo.id
      
    })

    this.getAllArticleSubscription = this.articleService.getArticle(0,4).subscribe(result => {
      this.data = result
    })
  }
  
  calculateDiff(sentDate : string) {
    var date1:any = new Date(sentDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getAge(dateString : string){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
   
    return age;
}

  createNewThread(){
    this.router.navigateByUrl('/thread')
  }

  ngOnDestroy(): void {
    this.getAllUserSubscription?.unsubscribe()
    this.getAllArticleSubscription?.unsubscribe()
  }
}
