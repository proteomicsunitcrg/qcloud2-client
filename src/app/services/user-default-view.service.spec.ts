import { TestBed, inject } from '@angular/core/testing';

import { UserDefaultViewService } from './user-default-view.service';

describe('UserDefaultViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDefaultViewService]
    });
  });

  it('should be created', inject([UserDefaultViewService], (service: UserDefaultViewService) => {
    expect(service).toBeTruthy();
  }));
});
