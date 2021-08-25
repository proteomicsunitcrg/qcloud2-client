import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipOfTheWeekComponent } from './tip-of-the-week.component';

describe('TipOfTheWeekComponent', () => {
  let component: TipOfTheWeekComponent;
  let fixture: ComponentFixture<TipOfTheWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipOfTheWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipOfTheWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
