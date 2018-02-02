import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import {FormsModule} from "@angular/forms";
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
