import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { JwtResponse } from '../../models/models';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  usuarioLogado: JwtResponse | null = null;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

  onLogout(){
    this.authService.logout();
  }

}
