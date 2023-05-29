import { TestBed } from '@angular/core/testing';

import { InteceptorPrincipalInterceptor } from './inteceptor-principal.interceptor';

describe('InteceptorPrincipalInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InteceptorPrincipalInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InteceptorPrincipalInterceptor = TestBed.inject(InteceptorPrincipalInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
