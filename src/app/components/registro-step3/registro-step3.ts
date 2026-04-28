import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegistroCompartir } from '../../services/registro-compartir';
import { RegistroData } from '../../models/models';

@Component({
  selector: 'app-registro-step3',
  imports: [RouterLink],
  templateUrl: './registro-step3.html',
  styleUrl: './registro-step3.css',
})
export class RegistroStep3 {

  registroData!: RegistroData;
  
  constructor(
    private router: Router,
    private registroCompartir: RegistroCompartir) {}

    ngOnInit() {
    this.registroData = this.registroCompartir.getRegistroData();

    if (!this.registroData || !this.registroData.usuario || !this.registroData.empresa) {
      // Si no hay datos de registro, redirige al paso 1
      //this.router.navigate(['/landing/registro']);
    }

  }

}
