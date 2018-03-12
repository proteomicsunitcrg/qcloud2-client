import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationSideMenuComponent } from './data-visualization-side-menu.component';

describe('DataVisualizationSideMenuComponent', () => {
  let component: DataVisualizationSideMenuComponent;
  let fixture: ComponentFixture<DataVisualizationSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVisualizationSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizationSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
