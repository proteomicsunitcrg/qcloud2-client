import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserViewComponent } from './main-user-view.component';

describe('MainUserViewComponent', () => {
  let component: MainUserViewComponent;
  let fixture: ComponentFixture<MainUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
