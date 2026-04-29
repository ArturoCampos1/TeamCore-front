import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegistroCompartir } from '../../services/registro-compartir';
import { RegistroData } from '../../models/models';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RegistroCompleto } from '../../services/registro-completo';

@Component({
  selector: 'app-registro-step3',
  imports: [RouterLink, ReactiveFormsModule, NgFor],
  templateUrl: './registro-step3.html',
  styleUrl: './registro-step3.css',
})
export class RegistroStep3 {

  sedeForm: FormGroup;

  registroData!: RegistroData;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registroCompleto: RegistroCompleto,
    private registroCompartir: RegistroCompartir) {
      this.sedeForm = this.fb.group({
        sedes: this.fb.array([])
      });
    }

    crearSede(): FormGroup {
      return this.fb.group({
        nombreSede: ['', Validators.required],
        direccion: ['', Validators.required],
        pais: ['', Validators.required],
        ciudad: ['', Validators.required],
        codPostal: ['', Validators.required],
      });
    }

    get sedes(): FormArray {
      return this.sedeForm.get('sedes') as FormArray;
    }

    agregarSede() {
      this.sedes.push(this.crearSede());
    }

    eliminarSede(index: number) {
      this.sedes.removeAt(index);
    }

    onSubmit(){
    if (this.sedeForm.valid) {
      const registroData = this.registroCompartir.getRegistroData();
    
      const updatedData = {
        ...registroData,
        sedes: this.sedeForm.value.sedes  
      };

      this.registroCompartir.updateRegistroData(updatedData);
    }

    this.registroCompleto.registrar(this.registroCompartir.getRegistroData())
      .subscribe({
      next: () => console.log('Registro OK'),
      error: (err) => console.error(err)
    });

  }

    ngOnInit() {
    this.registroData = this.registroCompartir.getRegistroData();

    if (!this.registroData || !this.registroData.usuario || !this.registroData.empresa) {
      // Si no hay datos de registro, redirige al paso 1
      //this.router.navigate(['/landing/registro']);
    }

  }

}
