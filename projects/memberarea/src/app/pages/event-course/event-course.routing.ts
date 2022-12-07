import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard"
import { CourseComponent } from "./course/course.component"
import { EventComponent } from "./event/event.component"
import { EventCourseComponent } from "./list/event-course.component"
import { PaymentComponent } from "./payment/payment.component"

const routes : Routes = [
    {
        path : '',
        component : EventCourseComponent,
        canActivate: [MemberGuard]
    },
    {
        path : 'payment/:id',
        component : PaymentComponent,
        canActivate: [MemberGuard]
    },
    {
        path : 'events',
        component : EventComponent,
        canActivate: [MemberGuard]
    },
    {
        path : 'courses',
        component : CourseComponent,
        canActivate: [MemberGuard]
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