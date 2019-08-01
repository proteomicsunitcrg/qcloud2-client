import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotopologuePlotComponent } from './isotopologue-plot.component';

describe('IsotopologuePlotComponent', () => {
  let component: IsotopologuePlotComponent;
  let fixture: ComponentFixture<IsotopologuePlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsotopologuePlotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsotopologuePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
