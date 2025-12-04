import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DataListComponent } from './data-list/data-list.component';

@NgModule({
  declarations: [
    DataListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [DataListComponent]
})
export class AppModule { }
