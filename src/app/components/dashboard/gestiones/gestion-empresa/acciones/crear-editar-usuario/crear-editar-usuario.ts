import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../../../../../services/usuario-service';
import { AuthService } from '../../../../../../services/auth-service';
import { JwtResponse } from '../../../../../../models/models';

@Component({
  selector: 'app-crear-editar-usuario',
  imports: [NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-usuario.html',
  styleUrl: './crear-editar-usuario.css',
})
export class CrearEditarUsuario {

  usuarioForm: FormGroup;
  usuarioLogado?: JwtResponse | null;
  usuarioEditar: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {
    const hoy = new Date().toISOString().substring(0, 10);

    this.usuarioForm = this.fb.group({
      idUsuario: [null],
      idEmpresa: [this.usuarioLogado?.idEmpresa],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[A-Za-z]$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      puesto: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      numeroTelefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', [Validators.required, Validators.maxLength(255)]],
      IBAN: ['', [Validators.required, Validators.pattern(/^ES\d{22}$/)]],
      numSeguridadSocial: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      salarioBruto: [null, [Validators.required, Validators.min(0)]],
      horasSemanales: [null, [Validators.required, Validators.min(1), Validators.max(40)]],
      diasVacacionesDisponibles: [{ value: '0', disabled: true }],
      fechaEntrada: [{ value: hoy, disabled: true }],
      fechaSalida: [{ value: '', disabled: true }],
      rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioLogado();

    const usuario = history.state.usuario;

    if (usuario) {
      this.usuarioEditar = usuario;
      this.usuarioForm.patchValue({
        nombreUsuario: usuario.nombreUsuario,
        dni: usuario.dni,
        correo: usuario.correo,
        puesto: usuario.puesto,
        numeroTelefono: usuario.numeroTelefono,
        direccion: usuario.direccion,
        IBAN: usuario.IBAN,
        numSeguridadSocial: usuario.numSeguridadSocial,
        salarioBruto: usuario.salarioBruto,
        horasSemanales: usuario.horasSemanales,
        diasVacacionesDisponibles: usuario.diasVacacionesDisponibles,
        fechaEntrada: usuario.fechaEntrada,
        fechaSalida: usuario.fechaSalida,
        rol: usuario.rol?.idRol
      });

      this.usuarioForm.get('password')?.disable();

      if (usuario.rol?.nombreRol === 'ADMIN') {
        this.usuarioForm.get('rol')?.disable();
      }

      // En edición la contraseña no es obligatoria
      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();
    }
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const formValue = this.usuarioForm.getRawValue();

    const usuario = {
      ...formValue,
      empresa: { idEmpresa: this.usuarioLogado?.idEmpresa },
      rol: { idRol: formValue.rol }
    };

    if (this.usuarioEditar) {
      usuario.idUsuario = this.usuarioEditar.idUsuario;
      this.usuarioService.actualizarUsuario(usuario.idUsuario, usuario).subscribe({
        next: () => this.router.navigate(['/admin/empresa/verUsuarios']),
        error: (err) => console.error(err)
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => this.router.navigate(['/admin/empresa/verUsuarios']),
        error: (err) => console.error(err)
      });
    }
  }
}