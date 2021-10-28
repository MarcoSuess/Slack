import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChatImageComponent } from './dialog-chat-image.component';

describe('DialogChatImageComponent', () => {
  let component: DialogChatImageComponent;
  let fixture: ComponentFixture<DialogChatImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChatImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChatImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
