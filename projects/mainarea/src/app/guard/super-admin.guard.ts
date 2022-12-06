import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { ROLE_CONST } from "projects/constant/RoleConst";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn: 'root'
})

export class SuperAdminGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private apiService: ApiService) { }

    canActivate(): boolean {
        const data = this.apiService.getData()
        if(data) {
            const roleCode=this.apiService.getRoleCode()
            if(roleCode==ROLE_CONST.SUPER_ADMIN) {
                return true
            } else if(roleCode == ROLE_CONST.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else{
                this.router.navigateByUrl('/home')
            }
        } else {
            this.router.navigateByUrl('/members/login')
        }
        return false
    }

    canLoad(): boolean {
        const roleCode=this.apiService.getRoleCode()
        if(roleCode==ROLE_CONST.SUPER_ADMIN) {
            return true
        } else if(roleCode == ROLE_CONST.ADMIN) {
            this.router.navigateByUrl('/dashboard/admin')
        } else {
            this.router.navigateByUrl('/home')
        }
        return false
    }

}