import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { AdminData, JwtResponse } from '../../../models/models';
import { AdminPart } from '../../../services/admin-part';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  usuario: JwtResponse | null = null;
  adminData?: AdminData;

  animatedData = {
    numEmpleados: 0,
    proyectos: 0,
    solicitudVacaciones: 0,
    tareasPendientes: 0
  };

  constructor(
    private authService: AuthService,
    private adminPart: AdminPart,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuarioLogado();

    if (!this.usuario) return;

    this.adminPart
      .dataAdmin(this.usuario.idEmpresa, this.usuario.dni)
      .subscribe({
        next: (data) => {
          this.adminData = data;

          this.startCounters(data);

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  private startCounters(data: AdminData) {
    this.animate('numEmpleados', data.numEmpleados);
    this.animate('proyectos', data.proyectos);
    this.animate('solicitudVacaciones', data.solicitudVacaciones);
    this.animate('tareasPendientes', data.tareasPendientes);
  }

  private animate(
    key: keyof typeof this.animatedData,
    target: number
  ) {
    let current = 0;
    const steps = 40;
    const increment = target / steps;

    const interval = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      this.animatedData[key] = Math.floor(current);
      this.cdr.detectChanges();
    }, 20);
  }
}