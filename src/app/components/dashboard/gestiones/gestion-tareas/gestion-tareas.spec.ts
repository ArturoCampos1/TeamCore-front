import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTareas } from './gestion-tareas';

describe('GestionTareas', () => {
  let component: GestionTareas;
  let fixture: ComponentFixture<GestionTareas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTareas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTareas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
