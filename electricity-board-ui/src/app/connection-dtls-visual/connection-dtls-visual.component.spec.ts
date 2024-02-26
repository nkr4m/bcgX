import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDtlsVisualComponent } from './connection-dtls-visual.component';

describe('ConnectionDtlsVisualComponent', () => {
  let component: ConnectionDtlsVisualComponent;
  let fixture: ComponentFixture<ConnectionDtlsVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionDtlsVisualComponent]
    });
    fixture = TestBed.createComponent(ConnectionDtlsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
