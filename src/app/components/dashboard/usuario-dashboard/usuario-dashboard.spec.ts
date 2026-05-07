import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDashboard } from './usuario-dashboard';

describe('UsuarioDashboard', () => {
  let component: UsuarioDashboard;
  let fixture: ComponentFixture<UsuarioDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
