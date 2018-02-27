import { TestBed, inject } from '@angular/core/testing';

import { InstrumentSampleService } from './instrument-sample.service';

describe('InstrumentSampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstrumentSampleService]
    });
  });

  it('should be created', inject([InstrumentSampleService], (service: InstrumentSampleService) => {
    expect(service).toBeTruthy();
  }));
});
