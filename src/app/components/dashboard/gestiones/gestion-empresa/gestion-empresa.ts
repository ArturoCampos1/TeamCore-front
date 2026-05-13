import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { Empresa, JwtResponse, Sede } from '../../../../models/models';
import { EmpresaService } from '../../../../services/empresa-service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-empresa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gestion-empresa.html',
  styleUrl: './gestion-empresa.css',
})
export class GestionEmpresa implements OnInit {

  formEmpresa: FormGroup;
  usuario: JwtResponse | null = null;
  empresa: Empresa | null = null;

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private fb: FormBuilder
  ) {
    this.formEmpresa = this.fb.group({
      nombreEmpresa: ['', [Validators.minLength(3), Validators.maxLength(25)]],
      cif: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(/^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/)]],
      areaTrabajo: ['', Validators.required],
      fechaSalida: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.fechaNoValidaValidator()]],
      datos: [''],
      sedes: this.fb.array([])
    });
  }

  fechaNoValidaValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;

      if (!value) return null;

      const year = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();

      if (year < 1500) {
        return { fechaMuyAntigua: true };
      }

      if (year > currentYear) {
        return { fechaFutura: true };
      }

      return null;
    };
  }

  get sedes(): FormArray {
    return this.formEmpresa.get('sedes') as FormArray;
  }

  crearSede(sede?: Sede): FormGroup {
    return this.fb.group({
      nombreSede: [sede?.nombreSede || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion: [sede?.direccion || '', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      pais: [sede?.pais || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      ciudad: [sede?.ciudad || '', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/)]],
      codPostal: [sede?.codPostal || '', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/)]],
      latitud: [sede?.latitud || '', [Validators.required, Validators.pattern(/^-?([0-9]|[1-8][0-9]|90)\.?[0-9]{0,6}$/)]],
      longitud: [sede?.longitud || '', [Validators.required, Validators.pattern(/^-?([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\.?[0-9]{0,6}$/)]]
    });
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado();
    if (!this.usuario) return;

    this.empresaService.findById(this.usuario.idEmpresa).subscribe({
      next: (data: Empresa) => {
        this.empresa = data;
        console.log('Empresa cargada:', data);
        this.formEmpresa.patchValue({
          nombreEmpresa: data.nombreEmpresa,
          cif:           data.cif,
          areaTrabajo:   data.areaTrabajo,
          fechaSalida:   data.fechaSalida,
          datos:         data.datos
        });

        this.sedes.clear();

        if (data.sedes?.length) {
          data.sedes.forEach((sede: Sede) => {
            this.sedes.push(this.crearSede(sede));
          });
        }
      },
      error: (err) => console.error('Error cargando empresa:', err)
    });
  }

  onSubmit(): void {
    if (this.formEmpresa.valid) {
      const empresaActualizada: Empresa = {
        ...this.empresa,
        ...this.formEmpresa.value
      };

      this.empresaService.update(empresaActualizada).subscribe({
        next: (data: Empresa) => {
          this.empresa = data;
          console.log('Empresa guardada:', data);
        },
        error: (err) => console.error('Error guardando empresa:', err)
      });
    }
  }
/*
  onGuardarSede(index: number): void {
  const sedeForm = this.sedes.at(index).value;
  const sede: Sede = {
    ...this.empresa?.sedes?.[index],
    ...sedeForm
  };

  this.empresaService.updateSede(sede).subscribe({
    next: (data: Sede) => {
      console.log('Sede guardada:', data);
    },
    error: (err) => console.error('Error guardando sede:', err)
  });
  }*/
}