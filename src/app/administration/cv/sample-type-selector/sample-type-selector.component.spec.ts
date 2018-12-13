import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeSelectorComponent } from './sample-type-selector.component';

describe('SampleTypeSelectorComponent', () => {
  let component: SampleTypeSelectorComponent;
  let fixture: ComponentFixture<SampleTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
