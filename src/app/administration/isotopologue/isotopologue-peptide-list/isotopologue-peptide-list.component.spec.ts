import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsotopologuePeptideListComponent } from './isotopologue-peptide-list.component';

describe('IsotopologuePeptideListComponent', () => {
  let component: IsotopologuePeptideListComponent;
  let fixture: ComponentFixture<IsotopologuePeptideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsotopologuePeptideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsotopologuePeptideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
