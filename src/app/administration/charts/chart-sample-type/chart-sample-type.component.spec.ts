import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSampleTypeComponent } from './chart-sample-type.component';

describe('ChartSampleTypeComponent', () => {
  let component: ChartSampleTypeComponent;
  let fixture: ComponentFixture<ChartSampleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartSampleTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSampleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
