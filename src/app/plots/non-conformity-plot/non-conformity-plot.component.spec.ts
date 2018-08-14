import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformityPlotComponent } from './non-conformity-plot.component';

describe('NonConformityPlotComponent', () => {
  let component: NonConformityPlotComponent;
  let fixture: ComponentFixture<NonConformityPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonConformityPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConformityPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
