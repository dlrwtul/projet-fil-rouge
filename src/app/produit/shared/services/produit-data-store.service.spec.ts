import { TestBed } from '@angular/core/testing';

import { ProduitDataStoreService } from './produit-data-store.service';

describe('ProduitDataStoreService', () => {
  let service: ProduitDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
