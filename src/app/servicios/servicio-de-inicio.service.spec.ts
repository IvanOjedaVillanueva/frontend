import { TestBed } from '@angular/core/testing';

import { ServicioDeInicioService } from './servicio-de-inicio.service';

describe('ServicioDeInicioService', () => {
  let service: ServicioDeInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDeInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
