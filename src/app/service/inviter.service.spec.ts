import { TestBed } from '@angular/core/testing';

import { InviterService } from './inviter.service';

describe('InviterService', () => {
  let service: InviterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
