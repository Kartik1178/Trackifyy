import { TestBed } from '@angular/core/testing';

import { DateserviceService } from './dateservice.service';

describe('DateserviceService', () => {
  let service: DateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
