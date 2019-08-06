import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnnotationsMainComponent } from './general-annotations-main.component';

describe('GeneralAnnotationsMainComponent', () => {
  let component: GeneralAnnotationsMainComponent;
  let fixture: ComponentFixture<GeneralAnnotationsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAnnotationsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnnotationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
