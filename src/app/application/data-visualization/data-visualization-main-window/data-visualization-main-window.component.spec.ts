import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationMainWindowComponent } from './data-visualization-main-window.component';

describe('DataVisualizationMainWindowComponent', () => {
  let component: DataVisualizationMainWindowComponent;
  let fixture: ComponentFixture<DataVisualizationMainWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataVisualizationMainWindowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizationMainWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
