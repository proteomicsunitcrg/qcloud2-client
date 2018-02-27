import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextSourcePeptideFormComponent } from './context-source-peptide-form.component';

describe('ContextSourceFormComponent', () => {
  let component: ContextSourcePeptideFormComponent;
  let fixture: ComponentFixture<ContextSourcePeptideFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextSourcePeptideFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSourcePeptideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
