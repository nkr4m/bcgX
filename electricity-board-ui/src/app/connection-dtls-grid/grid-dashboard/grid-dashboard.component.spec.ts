import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDashboardComponent } from './grid-dashboard.component';

describe('GridDashboardComponent', () => {
  let component: GridDashboardComponent;
  let fixture: ComponentFixture<GridDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridDashboardComponent]
    });
    fixture = TestBed.createComponent(GridDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
