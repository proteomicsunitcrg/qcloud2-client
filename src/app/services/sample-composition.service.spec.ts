import { TestBed, inject } from '@angular/core/testing';

import { SampleCompositionService } from './sample-composition.service';

describe('SampleCompositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleCompositionService]
    });
  });

  it('should be created', inject([SampleCompositionService], (service: SampleCompositionService) => {
    expect(service).toBeTruthy();
  }));
});
