import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemMainComponent } from './problem-main.component';

describe('ProblemMainComponent', () => {
  let component: ProblemMainComponent;
  let fixture: ComponentFixture<ProblemMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
