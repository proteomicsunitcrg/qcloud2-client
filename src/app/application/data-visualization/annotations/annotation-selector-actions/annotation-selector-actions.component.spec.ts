import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorActionsComponent } from './annotation-selector-actions.component';

describe('AnnotationSelectorActionsComponent', () => {
  let component: AnnotationSelectorActionsComponent;
  let fixture: ComponentFixture<AnnotationSelectorActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationSelectorActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationSelectorActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
