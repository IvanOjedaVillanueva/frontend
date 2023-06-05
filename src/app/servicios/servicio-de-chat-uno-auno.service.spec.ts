import { TestBed } from '@angular/core/testing';

import { ServicioDeChatUnoAUnoService } from './servicio-de-chat-uno-auno.service';

describe('ServicioDeChatUnoAUnoService', () => {
  let service: ServicioDeChatUnoAUnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDeChatUnoAUnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
