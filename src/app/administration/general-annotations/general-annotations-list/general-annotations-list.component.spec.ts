import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnnotationsListComponent } from './general-annotations-list.component';

describe('GeneralAnnotationsListComponent', () => {
  let component: GeneralAnnotationsListComponent;
  let fixture: ComponentFixture<GeneralAnnotationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAnnotationsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnnotationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
