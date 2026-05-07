import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(dni: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, { dni, password }).pipe(
      tap((respuesta: JwtResponse) => {
          console.log('Respuesta del back:', respuesta);
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('dni', respuesta.dni);
          localStorage.setItem('idEmpresa', respuesta.idEmpresa.toString());
          localStorage.setItem('nombreEmpresa', respuesta.nombreEmpresa);
          localStorage.setItem('nombre', respuesta.nombre);
          localStorage.setItem('rol', respuesta.rol);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

  getUsuarioLogado(): JwtResponse | null {
    const token = localStorage.getItem('token');
    const dni = localStorage.getItem('dni');
    const idEmpresa = localStorage.getItem('idEmpresa');
    const nombreEmpresa = localStorage.getItem('nombreEmpresa');
    const nombre = localStorage.getItem('nombre');
    const rol = localStorage.getItem('rol');

    let usuario: JwtResponse | null = null;
    if (token && dni && idEmpresa && nombreEmpresa && nombre && rol) {
      usuario = {
        token,
        dni,
        idEmpresa: Number(idEmpresa),
        nombreEmpresa,
        nombre,
        rol
      };
    }
    return usuario;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  getEmpresa(): string | null {
    return localStorage.getItem('nombreEmpresa');
  }

  getDni(): string | null {
    return localStorage.getItem('dni');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getIdEmpresa(): number {
    return Number(localStorage.getItem('idEmpresa'));
  }

  estaLogueado(): boolean {
    return !!this.getToken();
  }

  hasRol(rol: string): boolean {
    return this.getRol() === rol;
  }
}
