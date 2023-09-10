import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerWarningComponent } from './add-player-warning.component';

describe('AddPlayerWarningComponent', () => {
  let component: AddPlayerWarningComponent;
  let fixture: ComponentFixture<AddPlayerWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayerWarningComponent]
    });
    fixture = TestBed.createComponent(AddPlayerWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
