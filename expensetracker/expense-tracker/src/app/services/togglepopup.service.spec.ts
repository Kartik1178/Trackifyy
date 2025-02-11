import { TestBed } from '@angular/core/testing';

import { TogglepopupService } from './togglepopup.service';

describe('TogglepopupService', () => {
  let service: TogglepopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglepopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
