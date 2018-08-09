import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformitiesListComponent } from './non-conformities-list.component';

describe('NonConformitiesListComponent', () => {
  let component: NonConformitiesListComponent;
  let fixture: ComponentFixture<NonConformitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonConformitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConformitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
