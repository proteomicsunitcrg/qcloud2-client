import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefaultViewComponent } from './main-default-view.component';

describe('MainDefaultViewComponent', () => {
  let component: MainDefaultViewComponent;
  let fixture: ComponentFixture<MainDefaultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainDefaultViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDefaultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
