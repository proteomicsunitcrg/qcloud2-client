import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotopologueInformationComponent } from './isotopologue-information.component';

describe('IsotopologueInformationComponent', () => {
  let component: IsotopologueInformationComponent;
  let fixture: ComponentFixture<IsotopologueInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsotopologueInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsotopologueInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
