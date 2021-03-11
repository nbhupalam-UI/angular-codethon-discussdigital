import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { MaterialModule } from "../material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import "hammerjs";

import { AppComponent } from './app.component';
import { ArticlesComponent } from "./articles.component";
import { AppRoutingModule } from "./app.routing";

import { ArticlesModule } from "./../articles/articles.module";
import { DialogComponent } from "./dialog.component";

@NgModule({
  declarations: [AppComponent, ArticlesComponent, DialogComponent],
  imports: [
    BrowserModule,
    ArticlesModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    DialogComponent
],
  bootstrap: [AppComponent]
})
export class AppModule {}
