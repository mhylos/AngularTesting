import { TestBed } from '@angular/core/testing';

import { AccessEventService } from './access-event.service';

describe('AccessEventService', () => {
  let service: AccessEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
