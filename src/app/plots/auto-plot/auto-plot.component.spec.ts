import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPlotComponent } from './auto-plot.component';

describe('AutoPlotComponent', () => {
  let component: AutoPlotComponent;
  let fixture: ComponentFixture<AutoPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoPlotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
