import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent }   from './profile.component';
import { MaterialModule } from "../material/material.module";

const routes: Routes = [{ path: "", component: ProfileComponent }];

// index module bootstrapping
@NgModule({
    imports: [RouterModule.forChild(routes),FormsModule,ReactiveFormsModule,CommonModule,MaterialModule],
    declarations: [ProfileComponent]
})
export class ProfileModule { }