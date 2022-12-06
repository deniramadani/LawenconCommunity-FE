import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { CourseComponent } from "./course/course.component"
import { EventComponent } from "./event/event.component"
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
    {
        path : 'events',
        component : EventComponent
    },
    {
        path : 'courses',
        component : CourseComponent
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