import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeFormComponent } from './sample-type-form.component';

describe('SampleTypeFormComponent', () => {
  let component: SampleTypeFormComponent;
  let fixture: ComponentFixture<SampleTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SampleTypeFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
