// empresa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:8080/api/empresas';

  constructor(private http: HttpClient) {}

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }

  obtenerNumEmpresas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/numEmpresas`);
  }
}