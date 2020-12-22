import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationsDialogComponent } from './user-reservations-dialog.component';

describe('UserReservationsDialogComponent', () => {
  let component: UserReservationsDialogComponent;
  let fixture: ComponentFixture<UserReservationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReservationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
