import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarUsuario } from './crear-editar-usuario';

describe('CrearEditarUsuario', () => {
  let component: CrearEditarUsuario;
  let fixture: ComponentFixture<CrearEditarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEditarUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
