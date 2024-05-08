import { TestBed } from '@angular/core/testing';

import { DynamicPriceService } from './dynamic-price.service';

describe('DynamicPriceService', () => {
  let service: DynamicPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
