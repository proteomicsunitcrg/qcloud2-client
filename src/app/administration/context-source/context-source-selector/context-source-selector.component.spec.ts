import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextSourceSelectorComponent } from './context-source-selector.component';

describe('ContextSourceSelectorComponent', () => {
  let component: ContextSourceSelectorComponent;
  let fixture: ComponentFixture<ContextSourceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextSourceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
