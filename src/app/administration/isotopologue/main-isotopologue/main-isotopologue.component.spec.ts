import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIsotopologueComponent } from './main-isotopologue.component';

describe('MainIsotopologueComponent', () => {
  let component: MainIsotopologueComponent;
  let fixture: ComponentFixture<MainIsotopologueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainIsotopologueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIsotopologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
