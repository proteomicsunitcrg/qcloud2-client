import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSampleTypeComponent } from './main-sample-type.component';

describe('MainSampleTypeComponent', () => {
  let component: MainSampleTypeComponent;
  let fixture: ComponentFixture<MainSampleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSampleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSampleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
