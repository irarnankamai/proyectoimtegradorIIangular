import { TestBed } from '@angular/core/testing';

import { ListaPrestamoService } from './lista-prestamo.service';

describe('ListaPrestamoService', () => {
  let service: ListaPrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
