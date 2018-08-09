import { TestBed, inject } from '@angular/core/testing';

import { ThresholdNonConformityService } from './threshold-non-conformity.service';

describe('ThresholdNonConformityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThresholdNonConformityService]
    });
  });

  it('should be created', inject([ThresholdNonConformityService], (service: ThresholdNonConformityService) => {
    expect(service).toBeTruthy();
  }));
});
