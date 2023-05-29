import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDeInicioComponent } from './pagina-de-inicio.component';

describe('PaginaDeInicioComponent', () => {
  let component: PaginaDeInicioComponent;
  let fixture: ComponentFixture<PaginaDeInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaDeInicioComponent]
    });
    fixture = TestBed.createComponent(PaginaDeInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
