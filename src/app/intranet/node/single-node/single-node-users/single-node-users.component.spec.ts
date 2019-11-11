import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNodeUsersComponent } from './single-node-users.component';

describe('SingleNodeUsersComponent', () => {
  let component: SingleNodeUsersComponent;
  let fixture: ComponentFixture<SingleNodeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNodeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNodeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
