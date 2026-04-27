import { Injectable } from '@angular/core';
import { RegistroData } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class RegistroCompartir {
  
  private registroData: RegistroData = {};

  setRegistroData(data: RegistroData) {
    this.registroData = data;
  }

  getRegistroData(): RegistroData {
    return this.registroData;
  }

  updateRegistroData(data: Partial<RegistroData>) {
    this.registroData = { ...this.registroData, ...data };
  }

}
