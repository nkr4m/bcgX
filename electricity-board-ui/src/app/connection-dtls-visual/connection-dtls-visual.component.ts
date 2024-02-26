import { Component, OnInit } from '@angular/core';
import { ModuleViewService } from '../shared/services/module-view-service/module-view.service';


@Component({
  selector: 'app-connection-dtls-visual',
  templateUrl: './connection-dtls-visual.component.html',
  styleUrls: ['./connection-dtls-visual.component.css']
})
export class ConnectionDtlsVisualComponent {
  constructor(private moduleView: ModuleViewService) {

  }
  ngOnInit(): void {
    this.moduleView.updateModule("User Details - Visual View");
  }
}
