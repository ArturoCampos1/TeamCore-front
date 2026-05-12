import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { Empresa, JwtResponse } from '../../../../models/models';
import { EmpresaService } from '../../../../services/empresa-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-empresa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gestion-empresa.html',
  styleUrl: './gestion-empresa.css',
})
export class GestionEmpresa {

  formEmpresa: FormGroup;

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private fb: FormBuilder
  ) {

    this.formEmpresa = this.fb.group({
      nombreEmpresa: [],
      cif: [],
      areaTrabajo: [],
      fechaSalida: [],
      datos: [],
      sedes: this.fb.array([])    
    });

  }

  get sedes(): FormArray {
  return this.formEmpresa.get('sedes') as FormArray;
  }

  crearSede(sede?: any): FormGroup {
    return this.fb.group({
      nombreSede: [sede?.nombreSede || ''],
      pais: [sede?.pais || ''],
      ciudad: [sede?.ciudad || ''],
      codigoPostal: [sede?.codPostal || ''],
      direccion: [sede?.direccion || ''],
      latitud: [sede?.latitud || ''],
      longitud: [sede?.longitud || '']
    });
  }

  usuario: JwtResponse | null = null;
  empresa: Empresa | null = null;

  ngOnInit() {

    this.usuario = this.authService.getUsuarioLogado();

    if (!this.usuario) return;

        this.empresaService.findById(this.usuario.idEmpresa).subscribe({
      next: (data) => {
        this.empresa = data;

        // 1. Empresa normal
        this.formEmpresa.patchValue({
          nombreEmpresa: data.nombreEmpresa,
          cif: data.cif,
          areaTrabajo: data.areaTrabajo,
          fechaSalida: data.fechaSalida,
          datos: data.datos
        });

        // 2. Limpiar sedes
        this.sedes.clear();

        // 3. Cargar sedes al FormArray
        if (data.sedes?.length) {
          data.sedes.forEach((sede: any) => {
            this.sedes.push(this.crearSede(sede));
                console.log(this.formEmpresa.value);

          });
        }
      }
    }); 
  }

}