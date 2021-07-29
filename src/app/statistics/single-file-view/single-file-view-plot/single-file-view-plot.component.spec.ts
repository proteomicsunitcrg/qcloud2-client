import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileViewPlotComponent } from './single-file-view-plot.component';

describe('SingleFileViewPlotComponent', () => {
  let component: SingleFileViewPlotComponent;
  let fixture: ComponentFixture<SingleFileViewPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFileViewPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFileViewPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
