import { TestBed, inject } from '@angular/core/testing';

import { SampleTypeService } from './sample-type.service';

describe('SampleTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleTypeService]
    });
  });

  it('should be created', inject([SampleTypeService], (service: SampleTypeService) => {
    expect(service).toBeTruthy();
  }));
});
