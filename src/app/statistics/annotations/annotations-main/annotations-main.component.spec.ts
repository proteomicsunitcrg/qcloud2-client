import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationsMainComponent } from './annotations-main.component';

describe('AnnotationsMainComponent', () => {
  let component: AnnotationsMainComponent;
  let fixture: ComponentFixture<AnnotationsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
