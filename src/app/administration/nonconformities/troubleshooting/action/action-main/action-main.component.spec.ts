import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMainComponent } from './action-main.component';

describe('ActionMainComponent', () => {
  let component: ActionMainComponent;
  let fixture: ComponentFixture<ActionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
