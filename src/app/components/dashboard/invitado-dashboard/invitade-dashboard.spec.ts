import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoDashboard } from './invitado-dashboard';

describe('InvitadoDashboard', () => {
  let component: InvitadoDashboard;
  let fixture: ComponentFixture<InvitadoDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitadoDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
