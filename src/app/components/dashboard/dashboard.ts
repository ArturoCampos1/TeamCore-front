import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { JwtResponse } from '../../models/models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  usuarioLogado: JwtResponse | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

}
