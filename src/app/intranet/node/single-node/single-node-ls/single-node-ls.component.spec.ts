import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNodeLsComponent } from './single-node-ls.component';

describe('SingleNodeLsComponent', () => {
  let component: SingleNodeLsComponent;
  let fixture: ComponentFixture<SingleNodeLsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNodeLsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNodeLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
