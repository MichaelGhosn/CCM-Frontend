import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSectionComponent } from './translate-section.component';

describe('TranslateSectionComponent', () => {
  let component: TranslateSectionComponent;
  let fixture: ComponentFixture<TranslateSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
