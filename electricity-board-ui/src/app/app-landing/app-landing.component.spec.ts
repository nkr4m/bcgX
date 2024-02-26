import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLandingComponent } from './app-landing.component';

describe('AppLandingComponent', () => {
  let component: AppLandingComponent;
  let fixture: ComponentFixture<AppLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppLandingComponent]
    });
    fixture = TestBed.createComponent(AppLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
