import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

    mensajeError: string = '';

    formInicioSesion : FormGroup;

  constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private cd: ChangeDetectorRef
  ){
    this.formInicioSesion = this.fb.group({
      dni: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.formInicioSesion.valid){

      this.mensajeError = '';

      const dni = this.formInicioSesion.get('dni')?.value;
      const contrasena = this.formInicioSesion.get('contrasena')?.value;
      this.authService.login(dni,contrasena).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard/main']);
        },
        error: (err) => {
          this.mensajeError = err.error.mensaje;
          this.cd.detectChanges();
          if (err.error.mensaje === 'Contraseña incorrecta'){
            this.mensajeError = 'Contraseña incorrecta'
            this.cd.detectChanges();
          }
          if (err.error.mensaje === 'Usuario no encontrado'){
            this.mensajeError = 'Usuario no encontrado'
            this.cd.detectChanges();
          }
        }});
    }
  }

}
