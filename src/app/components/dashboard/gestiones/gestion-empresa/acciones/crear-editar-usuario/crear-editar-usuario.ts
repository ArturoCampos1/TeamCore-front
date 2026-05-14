import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-crear-editar-usuario',
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-usuario.html',
  styleUrl: './crear-editar-usuario.css',
})
export class CrearEditarUsuario {

  usuarioForm: FormGroup;

  rolesDisponibles: string[] = [
    'GERENTE',
    'RRHH',
    'USUARIO',
    'INVITADO'
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      idUsuario: [null],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[A-Za-z]$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      puesto: ['', [Validators.maxLength(100)]],
      correo: ['', [Validators.email]],
      numeroTelefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', [Validators.maxLength(255)]],
      iban: ['', [Validators.pattern(/^ES\d{22}$/)]],
      numSeguridadSocial: ['', [Validators.pattern(/^[0-9]{12}$/)]],
      salarioBruto: [null, [Validators.min(0)]],
      horasSemanales: [null, [Validators.min(1), Validators.max(40)]],
      diasVacacionesDisponibles: [{value: 30, disabled: true}],
      fechaEntrada: [''], 
      fechaSalida: [''],
      roles: ['', [Validators.required]]
    });
  }

  guardarUsuario(): void {

    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const usuario = {
      ...this.usuarioForm.getRawValue()
    };

    console.log(usuario);

    // Aquí llamas a tu servicio
    // this.usuarioService.crearUsuario(usuario).subscribe(...)
  }
}
