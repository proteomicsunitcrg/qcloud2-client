import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCvComponent } from './main-cv.component';

describe('MainCvComponent', () => {
  let component: MainCvComponent;
  let fixture: ComponentFixture<MainCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainCvComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
