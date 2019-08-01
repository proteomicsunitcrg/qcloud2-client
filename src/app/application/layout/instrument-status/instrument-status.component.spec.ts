import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentStatusComponent } from './instrument-status.component';

describe('InstrumentStatusComponent', () => {
  let component: InstrumentStatusComponent;
  let fixture: ComponentFixture<InstrumentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
