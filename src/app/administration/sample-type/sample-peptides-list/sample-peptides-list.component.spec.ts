import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePeptidesListComponent } from './sample-peptides-list.component';

describe('SamplePeptidesListComponent', () => {
  let component: SamplePeptidesListComponent;
  let fixture: ComponentFixture<SamplePeptidesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SamplePeptidesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePeptidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
