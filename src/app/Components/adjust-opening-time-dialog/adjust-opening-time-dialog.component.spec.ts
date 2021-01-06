import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustOpeningTimeDialogComponent } from './adjust-opening-time-dialog.component';

describe('AdjustOpeningTimeDialogComponent', () => {
  let component: AdjustOpeningTimeDialogComponent;
  let fixture: ComponentFixture<AdjustOpeningTimeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustOpeningTimeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustOpeningTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
