import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataprotectionComponent } from './dialog-dataprotection.component';

describe('DialogDataprotectionComponent', () => {
  let component: DialogDataprotectionComponent;
  let fixture: ComponentFixture<DialogDataprotectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDataprotectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataprotectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
