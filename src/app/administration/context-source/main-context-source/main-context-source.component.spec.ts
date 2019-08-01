import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContextSourceComponent } from './main-context-source.component';

describe('MainContextSourceComponent', () => {
  let component: MainContextSourceComponent;
  let fixture: ComponentFixture<MainContextSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainContextSourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContextSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
