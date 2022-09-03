import { TestBed } from '@angular/core/testing';

import { BulletinBoardService } from './bulletin-board.service';

describe('BulletinBoardService', () => {
  let service: BulletinBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
