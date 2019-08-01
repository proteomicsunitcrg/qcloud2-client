import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceColorPickerComponent } from './trace-color-picker.component';

describe('TraceColorPickerComponent', () => {
  let component: TraceColorPickerComponent;
  let fixture: ComponentFixture<TraceColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraceColorPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
