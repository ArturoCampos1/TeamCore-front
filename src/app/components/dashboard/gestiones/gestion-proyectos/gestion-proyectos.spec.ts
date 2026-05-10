import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProyectos } from './gestion-proyectos';

describe('GestionProyectos', () => {
  let component: GestionProyectos;
  let fixture: ComponentFixture<GestionProyectos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProyectos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProyectos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
