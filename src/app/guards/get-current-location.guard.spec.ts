import { TestBed } from '@angular/core/testing';

import { GetCurrentLocationGuard } from './get-current-location.guard';

describe('GetCurrentLocationGuard', () => {
  let guard: GetCurrentLocationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GetCurrentLocationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
