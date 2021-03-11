import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { AskComponent }   from './ask.component';
import { MaterialModule } from "../material/material.module";

const routes: Routes = [{ path: "", component: AskComponent }];

// index module bootstrapping
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [AskComponent]
})
export class AskModule {}