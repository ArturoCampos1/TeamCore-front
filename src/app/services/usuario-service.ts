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

  findUsuarioByEmpresa(idEmpresa: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiUrl}/empleados/${idEmpresa}`);
  }
  
  deleteById(idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUsuario}`);
  }

  crearUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario);
  }

}
