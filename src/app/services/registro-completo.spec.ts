import { TestBed } from '@angular/core/testing';

import { RegistroCompleto } from './registro-completo';

describe('RegistroCompleto', () => {
  let service: RegistroCompleto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroCompleto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
