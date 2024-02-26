import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NotFound404Component } from './not-found-404/not-found-404.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFound404Component,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NotFound404Component
  ]
})
export class ComponentsModule { }
