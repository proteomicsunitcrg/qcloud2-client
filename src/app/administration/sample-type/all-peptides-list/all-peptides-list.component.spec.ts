import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPeptidesListComponent } from './all-peptides-list.component';

describe('AllPeptidesListComponent', () => {
  let component: AllPeptidesListComponent;
  let fixture: ComponentFixture<AllPeptidesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllPeptidesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPeptidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
