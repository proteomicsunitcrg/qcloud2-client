import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCvsComponent } from './chart-cvs.component';

describe('ChartCvsComponent', () => {
  let component: ChartCvsComponent;
  let fixture: ComponentFixture<ChartCvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
