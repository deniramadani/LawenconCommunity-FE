import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FilterTokenInterceptor } from './filter/filter-token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PagesError404Component } from './not-found/pages-error404.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,PagesError404Component,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    ButtonModule,
    CardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FilterTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }