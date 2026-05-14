import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { Empresa, JwtResponse, Sede } from '../../../../models/models';
import { EmpresaService } from '../../../../services/empresa-service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { SedeService } from '../../../../services/sede-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-empresa',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './gestion-empresa.html',
  styleUrl: './gestion-empresa.css',
})
export class GestionEmpresa implements OnInit {

  mensaje: string = '';
  formEmpresa: FormGroup;
  usuario: JwtResponse | null = null;
  empresa: Empresa | null = null;

  constructor(
    private authService: AuthService,
    private sedeService: SedeService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef

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
      idSede: [sede?.idSede],
      nombreSede: [sede?.nombreSede || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      direccion: [sede?.direccion || '', [
        Validators.minLength(5),
        Validators.maxLength(150)
      ]],
      pais: [sede?.pais || '', [
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      ciudad: [sede?.ciudad || '', [
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
      ]],
      codPostal: [sede?.codPostal || '', [
        Validators.pattern(/^\d{5}$/)
      ]],
      latitud: [sede?.latitud || '', [
        Validators.pattern(/^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/)
      ]],
      longitud: [sede?.longitud || '', [
        Validators.pattern(/^-?(1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?|180(\.0+)?)$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado();
    if (!this.usuario) return;

    this.empresaService.findById(this.usuario.idEmpresa).subscribe({
      next: (data: Empresa) => {
        this.empresa = data;
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

  this.mensaje = 'Guardando...';

  if (this.formEmpresa.valid) {

    if (!this.formEmpresa.touched) {
      this.mensaje = 'No se han realizado cambios';
      return;
    }

    const empresaActualizada: Empresa = {
      ...this.empresa,
      ...this.formEmpresa.value
    };

    this.empresaService.update(empresaActualizada).subscribe({

      next: (data: Empresa) => {
        this.empresa = data;
        this.mensaje = 'Empresa actualizada correctamente';

        this.cd.detectChanges();
      },

      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al guardar';

        this.cd.detectChanges();
      }

    });

  } else {
    this.mensaje = 'Formulario inválido';
    this.formEmpresa.markAllAsTouched();
  }
}

onGuardarSede(index: number): void {

  const sedeGroup = this.sedes.at(index);

  if (sedeGroup.invalid) {
    sedeGroup.markAllAsTouched();
    this.mensaje = 'Sede inválida';
    return;
  }

  const sede: Sede = {
    ...sedeGroup.value,
    empresa: {
      idEmpresa: this.empresa!.idEmpresa
    } as Empresa
  };

  this.sedeService.update(sede).subscribe({
    next: () => this.mensaje = 'Sede guardada',
    error: (err) => {
      console.error(err);
      this.mensaje = 'Error al guardar sede';
    }
  });
}
}