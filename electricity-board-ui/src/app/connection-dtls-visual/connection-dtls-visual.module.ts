import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionDtlsVisualRoutingModule } from './connection-dtls-visual-routing.module';
import { ConnectionDtlsVisualComponent } from './connection-dtls-visual.component';
import { VisualDashboardComponent } from './visual-dashboard/visual-dashboard.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ComponentsModule } from '../shared/modules/components/components.module';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConnectionDtlsVisualComponent,
    VisualDashboardComponent
  ],
  imports: [
    CommonModule,
    ConnectionDtlsVisualRoutingModule,
    MaterialModule,
    ComponentsModule,
    NgChartsModule,
    FormsModule
  ]
})
export class ConnectionDtlsVisualModule { }
