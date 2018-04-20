import { TestBed, inject } from '@angular/core/testing';

import { SampleTypeCategoryService } from './sample-type-category.service';

describe('SampleTypeCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleTypeCategoryService]
    });
  });

  it('should be created', inject([SampleTypeCategoryService], (service: SampleTypeCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
