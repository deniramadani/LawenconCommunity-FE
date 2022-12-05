import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { ROLE_CONST } from "projects/constant/RoleConst";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn: 'root'
})

export class MemberGuard implements CanLoad, CanActivate {

    constructor(private apiService: ApiService, private router: Router) { }

    canActivate(): boolean {
        const data = this.apiService.getData()
        if (data) {
            const roleCode = this.apiService.getRoleCode()
            if(roleCode == ROLE_CONST.SUPER_ADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            } else if(roleCode == ROLE_CONST.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else {
                return true
            }
        } else {
            this.router.navigateByUrl('/members/login')
        }
        return false
    }
    
    canLoad(): boolean {
        const data = this.apiService.getData()
        if (data) {
            const roleCode = this.apiService.getRoleCode()
            if(roleCode == ROLE_CONST.SUPER_ADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            } else if(roleCode == ROLE_CONST.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else {
                return true
            }
            return false
        } else {
            this.router.navigateByUrl('/members/login')
            return false
        }
    }

}