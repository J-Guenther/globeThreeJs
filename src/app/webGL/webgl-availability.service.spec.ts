import { TestBed } from '@angular/core/testing';

import { WebglAvailabilityService } from './webgl-availability.service';

describe('WebglAvailabilityService', () => {
  let service: WebglAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebglAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
