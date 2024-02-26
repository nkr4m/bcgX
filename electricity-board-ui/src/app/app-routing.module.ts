import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLandingComponent } from './app-landing/app-landing.component';
import { NotFound404Component } from './shared/modules/components/not-found-404/not-found-404.component';

const routes: Routes = [
  {
    path: '', component: AppLandingComponent
  },
  { 
    path: 'connection-dtls-grid', loadChildren: () => import('./connection-dtls-grid/connection-dtls-grid.module').then(m => m.ConnectionDtlsGridModule) 
  },
  {
     path: 'connection-dtls-visual', loadChildren: () => import('./connection-dtls-visual/connection-dtls-visual.module').then(m => m.ConnectionDtlsVisualModule) 
    },
  {
    path: '**', component: NotFound404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
