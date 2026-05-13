import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SedeService {
  
  private apiUrl = 'http://localhost:8080/api/sedes';

  constructor(private http: HttpClient) {}

    update(sede: Sede): Observable<Sede> {
      return this.http.put<Sede>(`${this.apiUrl}/${sede.idSede}`, sede);
    }

}
