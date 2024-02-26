import { Component, OnInit } from '@angular/core';
import { ModuleViewService } from '../shared/services/module-view-service/module-view.service';


@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {
  
  constructor(private moduleView:ModuleViewService){

  }
  ngOnInit(): void {
    this.moduleView.updateModule(null)
  }
}
