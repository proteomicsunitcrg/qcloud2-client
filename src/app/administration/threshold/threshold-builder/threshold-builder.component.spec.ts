import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdBuilderComponent } from './threshold-builder.component';

describe('ThresholdBuilderComponent', () => {
  let component: ThresholdBuilderComponent;
  let fixture: ComponentFixture<ThresholdBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThresholdBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
