import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

  mensajeError: string = '';

  formInicioSesion : FormGroup;

  constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
  ){
    this.formInicioSesion = this.fb.group({
      dni: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.formInicioSesion.valid){
      const dni = this.formInicioSesion.get('dni')?.value;
      const contrasena = this.formInicioSesion.get('contrasena')?.value;

      this.authService.login(dni,contrasena).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.mensajeError = 'Usuario no encontrado o contraseña incorrecta';
        }
      });
    } else{
      this.mensajeError = 'Rellena los datos con coherencia';
    }
  }

}
