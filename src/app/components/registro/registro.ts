import { Component } from '@angular/core'
import { RouterLink, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa-service';
import { UsuarioService } from '../../services/usuario-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  formRegistro: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService

  ) {
    this.formRegistro = this.fb.group({
        nombreAdministrador: [''],
        nombreEmpresa: [''],
        dniUsuario: [''],
        email: [''],
        contrasena: ['']
    })
  }

  onSubmit() {
    
    if (this.formRegistro.valid) {

      const empresa = {
        nombreEmpresa: this.formRegistro.value.nombreEmpresa
      };

      const usuario = {
        nombreUsuario: this.formRegistro.value.nombreAdministrador,
        correo: this.formRegistro.value.email,
        password: this.formRegistro.value.contrasena,
        dni: this.formRegistro.value.dniUsuario
      };

      this.empresaService.createEmpresa(empresa).subscribe({
        next: (response) => {
          console.log('Empresa creada:', response);
        },
        error: (error) => {
          console.error('Error al crear la empresa:', error);
        }
      });

        this.usuarioService.createUsuario(usuario).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.router.navigate(['/landing/registroStep2']);
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
        }
      });
    }
  }

}
