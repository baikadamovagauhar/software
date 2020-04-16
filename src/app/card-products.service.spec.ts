import { TestBed } from '@angular/core/testing';

import { CardProductsService } from './card-products.service';

describe('CardProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardProductsService = TestBed.get(CardProductsService);
    expect(service).toBeTruthy();
  });
});
