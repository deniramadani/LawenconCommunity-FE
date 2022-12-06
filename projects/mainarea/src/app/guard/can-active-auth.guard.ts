import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { ROLE_CONST } from "projects/constant/RoleConst"
import { ApiService } from "../service/api.service"

@Injectable({
    providedIn: 'root'
})

export class CanActiveAuth implements CanActivate {

    constructor(private router: Router, private apiService: ApiService) { }

    canActivate(): boolean {
        const data = this.apiService.getData()
        if(data) {
            const roleCode = this.apiService.getRoleCode()
            if(roleCode == ROLE_CONST.SUPER_ADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            } else if (roleCode == ROLE_CONST.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else {
                this.router.navigateByUrl('/home')
            }
            return false
        } else {
            return true
        }
    }

}