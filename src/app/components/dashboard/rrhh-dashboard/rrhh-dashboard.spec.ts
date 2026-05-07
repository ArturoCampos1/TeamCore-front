import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhDashboard } from './rrhh-dashboard';

describe('RrhhDashboard', () => {
  let component: RrhhDashboard;
  let fixture: ComponentFixture<RrhhDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
