import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDepartamentos } from './gestion-departamentos';

describe('GestionDepartamentos', () => {
  let component: GestionDepartamentos;
  let fixture: ComponentFixture<GestionDepartamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDepartamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDepartamentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
