// src/app/route-transition.service.ts
import { Injectable } from '@angular/core';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class RouteTransitionService {
  static getRouteTransition() {
    return trigger('routeTransition', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0 }),
        ], { optional: true }),
        query(':enter', animate('400ms ease-in-out', style({ opacity: 1 })), { optional: true }),
      ]),
    ]);
  }
}
