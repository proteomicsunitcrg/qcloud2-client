import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeLabSystemSelectorComponent } from './sample-type-lab-system-selector.component';

describe('SampleTypeLabSystemSelectorComponent', () => {
  let component: SampleTypeLabSystemSelectorComponent;
  let fixture: ComponentFixture<SampleTypeLabSystemSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTypeLabSystemSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeLabSystemSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
