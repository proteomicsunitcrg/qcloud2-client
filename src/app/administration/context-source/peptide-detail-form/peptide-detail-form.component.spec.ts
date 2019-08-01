import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptideDetailFormComponent } from './peptide-detail-form.component';

describe('PeptideDetailFormComponent', () => {
  let component: PeptideDetailFormComponent;
  let fixture: ComponentFixture<PeptideDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeptideDetailFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeptideDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
