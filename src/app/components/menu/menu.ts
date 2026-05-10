import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { JwtResponse } from '../../models/models';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgFor],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  usuarioLogado: JwtResponse | null = null;
  menuItems: any[] = [];

  menusByRole: any = {

    ADMIN: [
      { label: 'Empresa', route: '/dashboard/admin/empresa' }
    ],

    GERENTE: [
      { label: 'Departamentos', route: '/dashboard/gerente/departamentos' },
      { label: 'Proyectos',     route: '/dashboard/gerente/proyectos' }
    ],

    RRHH: [
      { label: 'Empleados',  route: '/dashboard/rrhh/empleados' },
      { label: 'Vacaciones', route: '/dashboard/rrhh/vacaciones' }
    ],

    USUARIO: [
      { label: 'Tareas', route: '/dashboard/usuario/tareas' }
    ]

  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioLogado();
    const rol = this.usuarioLogado?.rol || '';
    this.menuItems = this.menusByRole[rol] || [];
  }

  onLogout() {
    this.authService.logout();
  }
}