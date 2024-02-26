import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { MaterialModule } from '../shared/modules/material/material.module';
import { ComponentsModule } from '../shared/modules/components/components.module';
import { GridDashboardComponent } from './grid-dashboard/grid-dashboard.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { ConnectionDtlsGridComponent } from './connection-dtls-grid.component';
import { ConnectionDtlsModalComponent } from './grid-dashboard/connection-dtls-modal/connection-dtls-modal.component';
import { ConnectionDtlsGridRoutingModule } from './connection-dtls-grid-routing.module';
import { CapitalFirstLetterPipe } from '../shared/pipes/capital-first-letter.pipe';



@NgModule({
  declarations: [
    ConnectionDtlsGridComponent,
    GridDashboardComponent,
    ConnectionDtlsModalComponent,
    CapitalFirstLetterPipe
  ],
  imports: [
    CommonModule,
    ConnectionDtlsGridRoutingModule,
    MaterialModule,
    ComponentsModule,
    MatDatepickerModule,FormsModule, ReactiveFormsModule,MatNativeDateModule

  ],providers:[NativeDateAdapter, DatePipe]
})
export class ConnectionDtlsGridModule { }
