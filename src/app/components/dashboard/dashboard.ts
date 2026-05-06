import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { AdminPart } from '../../services/admin-part';
import { AdminData, JwtResponse } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  usuarioLogado: JwtResponse | null = null;
  adminData: AdminData | null = null;

  constructor(private authService: AuthService, private adminPart: AdminPart) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioLogado();
    console.log('Usuario logado:', this.usuarioLogado);
    if (this.usuarioLogado?.idEmpresa && this.usuarioLogado?.dni) {
      this.adminPart
        .dataAdmin(this.usuarioLogado.idEmpresa, this.usuarioLogado.dni)
        .subscribe({
          next: (data) => {
            this.adminData = data;
            console.log('Datos admin cargados:', data);
          },
          error: (err) => console.error('Error cargando datos admin:', err)
        });
    }
  }
}