import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { EventCourseComponent } from "./list/event-course.component"
import { PaymentComponent } from "./payment/payment.component"


const routes : Routes = [
    {
        path : '',
        component : EventCourseComponent
    },
    {
        path : 'payment/:id',
        component : PaymentComponent
    },

]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class EventCourseRouting {}