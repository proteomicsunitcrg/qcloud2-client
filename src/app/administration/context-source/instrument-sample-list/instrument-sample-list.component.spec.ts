import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextSourceListComponent } from './context-source-list.component';

describe('ContextSourceListComponent', () => {
  let component: ContextSourceListComponent;
  let fixture: ComponentFixture<ContextSourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextSourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
