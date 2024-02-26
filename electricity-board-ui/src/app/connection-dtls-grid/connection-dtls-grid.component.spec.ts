import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDtlsGridComponent } from './connection-dtls-grid.component';

describe('ConnectionDtlsGridComponent', () => {
  let component: ConnectionDtlsGridComponent;
  let fixture: ComponentFixture<ConnectionDtlsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionDtlsGridComponent]
    });
    fixture = TestBed.createComponent(ConnectionDtlsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
