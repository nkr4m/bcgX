import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionDtlsGridComponent } from './connection-dtls-grid.component';
import { GridDashboardComponent } from './grid-dashboard/grid-dashboard.component';

const routes: Routes = [
  {
    path: '', component: ConnectionDtlsGridComponent, children: [
      {
        path: '', redirectTo: 'grid-dashboard', pathMatch: 'full'
      },
      {
        path: 'grid-dashboard', component: GridDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionDtlsGridRoutingModule { }
