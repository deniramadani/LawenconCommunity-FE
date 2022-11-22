import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { EventCourseComponent } from "./event-course.component"


const routes : Routes = [
    {
        path : '',
        component : EventCourseComponent
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