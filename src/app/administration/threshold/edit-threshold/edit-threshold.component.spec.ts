import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThresholdComponent } from './edit-threshold.component';

describe('EditThresholdComponent', () => {
  let component: EditThresholdComponent;
  let fixture: ComponentFixture<EditThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThresholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
