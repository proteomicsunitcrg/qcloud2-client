import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCompositionFormComponent } from './sample-composition-form.component';

describe('SampleCompositionFormComponent', () => {
  let component: SampleCompositionFormComponent;
  let fixture: ComponentFixture<SampleCompositionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleCompositionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCompositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
