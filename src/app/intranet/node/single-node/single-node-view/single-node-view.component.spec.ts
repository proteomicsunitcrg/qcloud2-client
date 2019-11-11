import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNodeViewComponent } from './single-node-view.component';

describe('SingleNodeViewComponent', () => {
  let component: SingleNodeViewComponent;
  let fixture: ComponentFixture<SingleNodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
