import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorDropdownComponent } from './annotation-selector-dropdown.component';

describe('AnnotationSelectorDropdownComponent', () => {
  let component: AnnotationSelectorDropdownComponent;
  let fixture: ComponentFixture<AnnotationSelectorDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnotationSelectorDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationSelectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
