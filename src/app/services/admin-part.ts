import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminData } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPart {

  private apiUrl = 'http://localhost:8080/api/adminPart';

  constructor(private http: HttpClient) {}

  dataAdmin(idEmpresa: number, dni: string): Observable<AdminData> {
    return this.http.get<AdminData>(`${this.apiUrl}/data/${idEmpresa}/${dni}`);
  }
}