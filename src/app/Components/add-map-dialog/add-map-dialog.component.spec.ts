import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapDialogComponent } from './add-map-dialog.component';

describe('AddMapDialogComponent', () => {
  let component: AddMapDialogComponent;
  let fixture: ComponentFixture<AddMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
