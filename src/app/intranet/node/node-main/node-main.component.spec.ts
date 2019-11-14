import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMainComponent } from './node-main.component';

describe('NodeMainComponent', () => {
  let component: NodeMainComponent;
  let fixture: ComponentFixture<NodeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
