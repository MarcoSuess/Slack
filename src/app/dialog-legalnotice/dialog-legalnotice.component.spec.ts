import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLegalnoticeComponent } from './dialog-legalnotice.component';

describe('DialogLegalnoticeComponent', () => {
  let component: DialogLegalnoticeComponent;
  let fixture: ComponentFixture<DialogLegalnoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLegalnoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLegalnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
