import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserStatusComponent } from './dialog-user-status.component';

describe('DialogUserStatusComponent', () => {
  let component: DialogUserStatusComponent;
  let fixture: ComponentFixture<DialogUserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
