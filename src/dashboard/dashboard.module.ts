import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { MaterialModule } from "../material/material.module";

const routes: Routes = [{ path: "", component: DashboardComponent }];

// index module bootstrapping
@NgModule({
    imports: [RouterModule.forChild(routes), MaterialModule],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
