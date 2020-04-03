import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSelectorSubMenuComponent } from './annotation-selector-sub-menu.component';

describe('AnnotationSelectorSubMenuComponent', () => {
  let component: AnnotationSelectorSubMenuComponent;
  let fixture: ComponentFixture<AnnotationSelectorSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnotationSelectorSubMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationSelectorSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
