import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpresa } from './gestion-empresa';

describe('GestionEmpresa', () => {
  let component: GestionEmpresa;
  let fixture: ComponentFixture<GestionEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEmpresa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
