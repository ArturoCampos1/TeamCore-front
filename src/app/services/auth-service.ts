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
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('nombre', respuesta.nombre);
        localStorage.setItem('rol', respuesta.rol);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  estaLogueado(): boolean {
    return !!this.getToken();
  }
}
