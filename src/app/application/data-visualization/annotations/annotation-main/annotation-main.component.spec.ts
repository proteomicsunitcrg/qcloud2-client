import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationMainComponent } from './annotation-main.component';

describe('AnnotationMainComponent', () => {
  let component: AnnotationMainComponent;
  let fixture: ComponentFixture<AnnotationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
