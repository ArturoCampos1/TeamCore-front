import { Component } from '@angular/core'
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegistroData } from '../../models/models';
import { RegistroCompartir } from '../../services/registro-compartir';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  formRegistro: FormGroup;

  constructor(
    private registroCompartir: RegistroCompartir,
    private router: Router,
    private fb: FormBuilder

  ) {
    this.formRegistro = this.fb.group({
        nombreAdministrador: ['', [Validators.minLength(3), Validators.maxLength(25)]],
        nombreEmpresa: ['', [Validators.minLength(3), Validators.maxLength(25)]],
        dniUsuario: ['', Validators.pattern(/^\d{8}[A-Za-z]$/)],
        email: ['', [Validators.email]],
        contrasena: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) , Validators.maxLength(100)]]
    })
  }

  ngOnInit() {
    const registroData = this.registroCompartir.getRegistroData();

    if (registroData && registroData.usuario && registroData.empresa  ) {
      this.formRegistro.patchValue({
        nombreAdministrador: registroData.usuario.nombreUsuario,
        nombreEmpresa: registroData.empresa.nombreEmpresa,
        dniUsuario: registroData.usuario.dni,
        email: registroData.usuario.correo,
        contrasena: registroData.usuario.password
      });
    }
  }

  onSubmit() {
    
    if (this.formRegistro.valid) {

        const registroData: RegistroData = {

          usuario: {
            nombreUsuario: this.formRegistro.value.nombreAdministrador,
            correo: this.formRegistro.value.email,
            dni: this.formRegistro.value.dniUsuario,
            password: this.formRegistro.value.contrasena
          },
          empresa: {
            nombreEmpresa: this.formRegistro.value.nombreEmpresa
          }
          
        };

        this.registroCompartir.setRegistroData(registroData);
        
        this.router.navigate(['/landing/registroStep2']);

    } else {
    
        this.formRegistro.markAllAsTouched();

    }

  }
}
