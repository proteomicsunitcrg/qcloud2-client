import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptideFormComponent } from './peptide-form.component';

describe('PeptideFormComponent', () => {
  let component: PeptideFormComponent;
  let fixture: ComponentFixture<PeptideFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeptideFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeptideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
