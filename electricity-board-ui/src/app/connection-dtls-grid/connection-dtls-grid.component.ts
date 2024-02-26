import { Component, OnInit } from '@angular/core';
import { ModuleViewService } from '../shared/services/module-view-service/module-view.service';

@Component({
  selector: 'app-connection-dtls-grid',
  templateUrl: './connection-dtls-grid.component.html',
  styleUrls: ['./connection-dtls-grid.component.css']
})
export class ConnectionDtlsGridComponent {
  constructor(private moduleView:ModuleViewService){

  }
  ngOnInit(): void {
    this.moduleView.updateModule("User Details - Grid View");
  }
}
