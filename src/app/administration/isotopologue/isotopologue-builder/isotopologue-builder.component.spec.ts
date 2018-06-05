import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotopologueBuilderComponent } from './isotopologue-builder.component';

describe('IsotopologueBuilderComponent', () => {
  let component: IsotopologueBuilderComponent;
  let fixture: ComponentFixture<IsotopologueBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsotopologueBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsotopologueBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
