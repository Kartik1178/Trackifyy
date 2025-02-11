import { TestBed } from '@angular/core/testing';

import { TotalexpensesService } from './totalexpenses.service';

describe('TotalexpensesService', () => {
  let service: TotalexpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalexpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
