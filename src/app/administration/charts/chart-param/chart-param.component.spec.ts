import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartParamComponent } from './chart-param.component';

describe('ChartParamComponent', () => {
  let component: ChartParamComponent;
  let fixture: ComponentFixture<ChartParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
