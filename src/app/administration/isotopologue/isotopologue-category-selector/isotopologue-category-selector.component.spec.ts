import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotopologueCategorySelectorComponent } from './isotopologue-category-selector.component';

describe('IsotopologueCategorySelectorComponent', () => {
  let component: IsotopologueCategorySelectorComponent;
  let fixture: ComponentFixture<IsotopologueCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsotopologueCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsotopologueCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
