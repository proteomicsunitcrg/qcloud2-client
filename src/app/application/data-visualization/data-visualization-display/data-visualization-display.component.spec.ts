import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationDisplayComponent } from './data-visualization-display.component';

describe('DataVisualizationDisplayComponent', () => {
  let component: DataVisualizationDisplayComponent;
  let fixture: ComponentFixture<DataVisualizationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVisualizationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
