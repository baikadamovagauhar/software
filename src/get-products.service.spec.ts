import { TestBed } from '@angular/core/testing';

import { GetProductsService } from './get-products.service';

describe('GetProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetProductsService = TestBed.get(GetProductsService);
    expect(service).toBeTruthy();
  });
});
