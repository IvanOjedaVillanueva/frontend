import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDeRegistroComponent } from './pagina-de-registro.component';

describe('PaginaDeRegistroComponent', () => {
  let component: PaginaDeRegistroComponent;
  let fixture: ComponentFixture<PaginaDeRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaDeRegistroComponent]
    });
    fixture = TestBed.createComponent(PaginaDeRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
