import { TestBed, inject } from '@angular/core/testing';

import { IsotopologueService } from './isotopologue.service';

describe('IsotopologueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsotopologueService]
    });
  });

  it('should be created', inject([IsotopologueService], (service: IsotopologueService) => {
    expect(service).toBeTruthy();
  }));
});
