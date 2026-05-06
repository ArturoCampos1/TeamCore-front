import { TestBed } from '@angular/core/testing';

import { AdminPart } from './admin-part';

describe('AdminPart', () => {
  let service: AdminPart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
