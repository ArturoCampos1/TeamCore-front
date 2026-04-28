import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegistroCompartir } from '../../services/registro-compartir';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro-step2',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './registro-step2.html',
  styleUrl: './registro-step2.css',
})
export class RegistroStep2 {

  formRegistro: FormGroup;

  constructor(
        private router: Router,
        private fb: FormBuilder,
        private registroCompartir: RegistroCompartir
  ) {
    this.formRegistro = this.fb.group({
        nombreAdministrador: [''],
        nombreEmpresa: [''],
        logoEmpresa: [null],
        cif: ['', [Validators.maxLength(9), Validators.pattern(/[A-Za-z]\d{8}/)]],
        fechaFundacion: [''],
        areaTrabajo: ['', Validators.required]
    });
  }

  ngOnInit() {
    const registroData = this.registroCompartir.getRegistroData();

    if (!registroData || !registroData.usuario || !registroData.empresa) {
      // Si no hay datos de registro, redirige al paso 1
      this.router.navigate(['/landing/registro']);
    }

    this.formRegistro.patchValue({
      nombreAdministrador: registroData.usuario?.nombreUsuario || '',
      nombreEmpresa: registroData.empresa?.nombreEmpresa || '',
      cif: registroData.empresa?.cif || '',
      fechaFundacion: registroData.empresa?.fechaSalida || '',
      areaTrabajo: registroData.empresa?.areaTrabajo || ''
    });

  }

  onSubmit() {
    if (this.formRegistro.valid) {
      const registroData = this.registroCompartir.getRegistroData();
    
      const updatedData = {
          ...registroData,
          empresa: {
            ...(registroData.empresa || {}),
            cif: this.formRegistro.value.cif,
            areaTrabajo: this.formRegistro.value.areaTrabajo,
            fechaSalida: this.formRegistro.value.fechaFundacion
          }
      };

      this.registroCompartir.updateRegistroData(updatedData);
      console.log('Datos de registro actualizados:', this.registroCompartir.getRegistroData());
      this.router.navigate(['/landing/registroStep3']);

      } else {
        this.formRegistro.markAllAsTouched();
      }

    }

  }
