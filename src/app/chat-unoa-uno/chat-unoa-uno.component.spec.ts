import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUnoaUnoComponent } from './chat-unoa-uno.component';

describe('ChatUnoaUnoComponent', () => {
  let component: ChatUnoaUnoComponent;
  let fixture: ComponentFixture<ChatUnoaUnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatUnoaUnoComponent]
    });
    fixture = TestBed.createComponent(ChatUnoaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
