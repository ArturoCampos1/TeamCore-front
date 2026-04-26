import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario): Observable<Usuario> {
    //usuario.puesto = 'Administrador';
    //usuario.empleadoActivo = true;
    //usuario.fechaEntrada = new Date().toISOString().split('T')[0];
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

}
