import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnnotationsBuilderComponent } from './general-annotations-builder.component';

describe('GeneralAnnotationsBuilderComponent', () => {
  let component: GeneralAnnotationsBuilderComponent;
  let fixture: ComponentFixture<GeneralAnnotationsBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAnnotationsBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnnotationsBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
