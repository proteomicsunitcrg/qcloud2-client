import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGuideSetComponent } from './main-guide-set.component';

describe('MainGuideSetComponent', () => {
  let component: MainGuideSetComponent;
  let fixture: ComponentFixture<MainGuideSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainGuideSetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGuideSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
