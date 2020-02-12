import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemBuilderComponent } from './problem-builder.component';

describe('ProblemBuilderComponent', () => {
  let component: ProblemBuilderComponent;
  let fixture: ComponentFixture<ProblemBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
