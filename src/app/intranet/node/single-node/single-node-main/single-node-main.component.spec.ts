import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNodeMainComponent } from './single-node-main.component';

describe('SingleNodeMainComponent', () => {
  let component: SingleNodeMainComponent;
  let fixture: ComponentFixture<SingleNodeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNodeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNodeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
