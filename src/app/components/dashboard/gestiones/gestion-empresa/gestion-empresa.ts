import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { Empresa, JwtResponse } from '../../../../models/models';
import { EmpresaService } from '../../../../services/empresa-service';

@Component({
  selector: 'app-gestion-empresa',
  imports: [],
  templateUrl: './gestion-empresa.html',
  styleUrl: './gestion-empresa.css',
})
export class GestionEmpresa {

    constructor(
    private authService: AuthService,
    private empresaService: EmpresaService) {}

    usuario: JwtResponse | null = null;
    empresa: Empresa | null = null;
    
    ngOnInit() {
      this.usuario = this.authService.getUsuarioLogado();
      if (!this.usuario) return;

      this.empresaService.findById(this.usuario.idEmpresa).subscribe({
        next: (data) => {
          this.empresa = data;
          console.log("Empresa: " + JSON.stringify(this.empresa))
        },
        error: (err) => {
          console.log("Error: " + err)
        }
      })
    }

}
