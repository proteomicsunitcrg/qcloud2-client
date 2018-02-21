import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextSourceDetailComponent } from './context-source-detail.component';

describe('ContextSourceDetailComponent', () => {
  let component: ContextSourceDetailComponent;
  let fixture: ComponentFixture<ContextSourceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextSourceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
