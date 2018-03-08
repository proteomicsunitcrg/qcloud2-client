import { TestBed, inject } from '@angular/core/testing';

import { ChartParamsService } from './chart-params.service';

describe('ChartParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartParamsService]
    });
  });

  it('should be created', inject([ChartParamsService], (service: ChartParamsService) => {
    expect(service).toBeTruthy();
  }));
});
