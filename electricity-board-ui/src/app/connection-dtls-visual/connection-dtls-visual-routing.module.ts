import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionDtlsVisualComponent } from './connection-dtls-visual.component';
import { VisualDashboardComponent } from './visual-dashboard/visual-dashboard.component';

const routes: Routes = [
  {
    path: '', component: ConnectionDtlsVisualComponent, children: [
      {
        path: '', redirectTo: 'visual-dashboard', pathMatch: 'full'
      },
      {
        path: 'visual-dashboard', component: VisualDashboardComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionDtlsVisualRoutingModule { }
