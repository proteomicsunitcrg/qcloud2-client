import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultViewSelectorComponent } from './default-view-selector.component';

describe('DefaultViewSelectorComponent', () => {
  let component: DefaultViewSelectorComponent;
  let fixture: ComponentFixture<DefaultViewSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultViewSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultViewSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
