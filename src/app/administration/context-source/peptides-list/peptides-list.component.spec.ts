import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeptidesListComponent } from './peptides-list.component';

describe('PeptidesListComponent', () => {
  let component: PeptidesListComponent;
  let fixture: ComponentFixture<PeptidesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeptidesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeptidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
