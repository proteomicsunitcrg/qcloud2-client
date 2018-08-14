import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformitiesInformationComponent } from './non-conformities-information.component';

describe('NonConformitiesInformationComponent', () => {
  let component: NonConformitiesInformationComponent;
  let fixture: ComponentFixture<NonConformitiesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonConformitiesInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConformitiesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
