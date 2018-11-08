import { TestBed } from '@angular/core/testing';

import { TraceColorService } from './trace-color.service';

describe('TraceColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraceColorService = TestBed.get(TraceColorService);
    expect(service).toBeTruthy();
  });
});
