import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeListComponent } from './sample-type-list.component';

describe('SampleTypeListComponent', () => {
  let component: SampleTypeListComponent;
  let fixture: ComponentFixture<SampleTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SampleTypeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
