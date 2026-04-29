import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroData } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroCompleto {
  
  private apiUrl = 'http://localhost:8080/api/registrocompleto';

  constructor(private http: HttpClient) {}

  registrar(registroData: RegistroData): Observable<RegistroData> {
    return this.http.post<RegistroData>(this.apiUrl, registroData);
  }

}
