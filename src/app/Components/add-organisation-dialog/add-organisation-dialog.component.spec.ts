import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganisationDialogComponent } from './add-organisation-dialog.component';

describe('AddCompanyDialogComponent', () => {
  let component: AddOrganisationDialogComponent;
  let fixture: ComponentFixture<AddOrganisationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrganisationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganisationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
