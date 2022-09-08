import { TestBed } from '@angular/core/testing';

import { MainComponentService } from './main-component.service';

describe('MainComponentService', () => {
  let service: MainComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
