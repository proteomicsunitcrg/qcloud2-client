import { TestBed, inject } from '@angular/core/testing';

import { PeptideService } from './peptide.service';

describe('PeptideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeptideService]
    });
  });

  it('should be created', inject([PeptideService], (service: PeptideService) => {
    expect(service).toBeTruthy();
  }));
});
