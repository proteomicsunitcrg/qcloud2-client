import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartContextSourceComponent } from './chart-context-source.component';

describe('ChartContextSourceComponent', () => {
  let component: ChartContextSourceComponent;
  let fixture: ComponentFixture<ChartContextSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartContextSourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartContextSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
