import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPeptideFormComponent } from './new-peptide-form.component';

describe('NewPeptideFormComponent', () => {
  let component: NewPeptideFormComponent;
  let fixture: ComponentFixture<NewPeptideFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPeptideFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPeptideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
