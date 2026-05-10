import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVacaciones } from './gestion-vacaciones';

describe('GestionVacaciones', () => {
  let component: GestionVacaciones;
  let fixture: ComponentFixture<GestionVacaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVacaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionVacaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
