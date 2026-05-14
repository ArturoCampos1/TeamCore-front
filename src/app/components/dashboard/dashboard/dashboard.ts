import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
  const role = this.authService.getRol();

  switch(role) {

    case 'ADMIN':
      this.router.navigate(['/dashboard/admin']);
      break;

    case 'GERENTE':
      this.router.navigate(['/dashboard/gerente']);
      break;

    case 'RRHH':
      this.router.navigate(['/dashboard/RRHH']);
      break;

    case 'USUARIO':
      this.router.navigate(['/dashboard/usuario']);
      break;

    case 'INVITADO':
      this.router.navigate(['/dashboard/invitado']);
      break;

    default:
      this.router.navigate(['/landing']);
    }
  }

}
