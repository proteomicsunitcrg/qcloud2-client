import { TestBed, inject } from '@angular/core/testing';

import { NonConformityService } from './non-conformity.service';

describe('NonConformityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonConformityService]
    });
  });

  it('should be created', inject([NonConformityService], (service: NonConformityService) => {
    expect(service).toBeTruthy();
  }));
});
