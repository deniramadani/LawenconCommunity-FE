import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { Observable, tap } from "rxjs"
import { ApiService } from "../service/api.service"

@Injectable()
export class FilterTokenInterceptor implements HttpInterceptor {
    
    constructor(private apiService: ApiService,
        private toast: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.apiService.getData()
        let reqClone = req

        if (token) {
            reqClone = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.apiService.getData()}`
                }
            })
        }

        return next.handle(reqClone).pipe(
            tap({
                next: data => {
                    if (data instanceof HttpResponse) {
                        if (data.body.message) {
                            this.toast.success(data.body.message, 'Information')
                        }
                    }
                },
                error: err => {
                    if (err instanceof HttpErrorResponse) {
                        this.toast.error(err.error.message, 'Information ')
                    }
                }
            })
        )
    }

}