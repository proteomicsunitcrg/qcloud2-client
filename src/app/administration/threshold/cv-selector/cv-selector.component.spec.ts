import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSelectorComponent } from './cv-selector.component';

describe('CvSelectorComponent', () => {
  let component: CvSelectorComponent;
  let fixture: ComponentFixture<CvSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
