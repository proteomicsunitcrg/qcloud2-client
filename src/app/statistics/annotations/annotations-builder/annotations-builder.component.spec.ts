import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationsBuilderComponent } from './annotations-builder.component';

describe('AnnotationsBuilderComponent', () => {
  let component: AnnotationsBuilderComponent;
  let fixture: ComponentFixture<AnnotationsBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationsBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
