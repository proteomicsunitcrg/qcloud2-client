import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainParametersComponent } from './main-parameters.component';

describe('MainParametersComponent', () => {
  let component: MainParametersComponent;
  let fixture: ComponentFixture<MainParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
