import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegistroCompartir } from '../../services/registro-compartir';

@Component({
  selector: 'app-registro-step3',
  imports: [RouterLink],
  templateUrl: './registro-step3.html',
  styleUrl: './registro-step3.css',
})
export class RegistroStep3 {

  constructor(
    private router: Router,
    private registroCompartir: RegistroCompartir) {}

    ngOnInit() {
    const registroData = this.registroCompartir.getRegistroData();

    if (!registroData || !registroData.usuario || !registroData.empresa) {
      // Si no hay datos de registro, redirige al paso 1
      //this.router.navigate(['/landing/registro']);
    }

  }

}
