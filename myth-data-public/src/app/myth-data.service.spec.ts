import { TestBed } from '@angular/core/testing';

import { MythDataService } from './myth-data.service';

describe('MythDataService', () => {
  let service: MythDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MythDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
