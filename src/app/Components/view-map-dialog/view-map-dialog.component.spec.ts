import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMapDialogComponent } from './view-map-dialog.component';

describe('ViewMapDialogComponent', () => {
  let component: ViewMapDialogComponent;
  let fixture: ComponentFixture<ViewMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
