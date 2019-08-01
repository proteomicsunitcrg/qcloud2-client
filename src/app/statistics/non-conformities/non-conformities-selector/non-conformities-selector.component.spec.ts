import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformitiesSelectorComponent } from './non-conformities-selector.component';

describe('NonConformitiesListComponent', () => {
  let component: NonConformitiesSelectorComponent;
  let fixture: ComponentFixture<NonConformitiesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonConformitiesSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConformitiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
