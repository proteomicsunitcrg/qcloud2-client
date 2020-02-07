import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorProblemsComponent } from './annotation-selector-problems.component';

describe('AnnotationSelectorProblemsComponent', () => {
  let component: AnnotationSelectorProblemsComponent;
  let fixture: ComponentFixture<AnnotationSelectorProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationSelectorProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationSelectorProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
