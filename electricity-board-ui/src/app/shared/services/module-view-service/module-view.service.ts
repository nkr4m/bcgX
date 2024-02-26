import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Your component or service code here


@Injectable({
  providedIn: 'root'
})
export class ModuleViewService {

  private moduleView: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  moduleViewData = this.moduleView.asObservable();

  updateModule(data: string | null) {
     this.moduleView.next(data);
  }
  

}
