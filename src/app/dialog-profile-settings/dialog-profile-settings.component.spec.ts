import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileSettingsComponent } from './dialog-profile-settings.component';

describe('DialogProfileSettingsComponent', () => {
  let component: DialogProfileSettingsComponent;
  let fixture: ComponentFixture<DialogProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProfileSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
