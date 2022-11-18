import { Component, OnInit, Inject } from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';
@Component({
  selector: 'member-header',
  templateUrl: './header.member.component.html',
})

export class HeaderMemberComponent {

 
  listItems: SelectItem[] = [
    {label: 'pi pi-user', value: 'v1'},
    {label: 'pi pi-plus', value: 'v2'}
  ]
  
  selectedItem!: string;



}