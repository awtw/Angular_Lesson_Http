import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Setting } from './setting';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [Setting, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  },{
      provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
