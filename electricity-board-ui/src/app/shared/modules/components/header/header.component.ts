import { Component, OnInit } from '@angular/core';
import { ModuleViewService } from 'src/app/shared/services/module-view-service/module-view.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  moduleName!: string | null
  constructor(private moduleView: ModuleViewService) {

  }
  ngOnInit(): void {
    this.moduleView.moduleViewData.subscribe(
      (data) => {

        this.moduleName = data

      }
    )
  }

}
