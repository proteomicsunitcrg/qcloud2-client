import { TestBed, inject } from '@angular/core/testing';

import { GuideSetService } from './guide-set.service';

describe('GuideSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuideSetService]
    });
  });

  it('should be created', inject([GuideSetService], (service: GuideSetService) => {
    expect(service).toBeTruthy();
  }));
});
