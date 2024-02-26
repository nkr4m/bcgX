import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { RouteTransitionService } from './shared/services/animations/route-transition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RouteTransitionService.getRouteTransition()] // Add animations property
})
export class AppComponent {
  title = 'electricity-board-ui';
  constructor(private routeTransitionService: RouteTransitionService){
    
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
