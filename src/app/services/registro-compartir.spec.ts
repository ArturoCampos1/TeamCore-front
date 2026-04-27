import { TestBed } from '@angular/core/testing';

import { RegistroCompartir } from './registro-compartir';

describe('RegistroCompartir', () => {
  let service: RegistroCompartir;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroCompartir);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
