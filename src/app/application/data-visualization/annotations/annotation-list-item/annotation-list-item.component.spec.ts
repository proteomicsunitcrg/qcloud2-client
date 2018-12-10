import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationListItemComponent } from './annotation-list-item.component';

describe('AnnotationListItemComponent', () => {
  let component: AnnotationListItemComponent;
  let fixture: ComponentFixture<AnnotationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
