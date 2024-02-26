import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDtlsModalComponent } from './connection-dtls-modal.component';

describe('ConnectionDtlsModalComponent', () => {
  let component: ConnectionDtlsModalComponent;
  let fixture: ComponentFixture<ConnectionDtlsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionDtlsModalComponent]
    });
    fixture = TestBed.createComponent(ConnectionDtlsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
