import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewBuilderComponent } from './user-view-builder.component';

describe('UserViewBuilderComponent', () => {
  let component: UserViewBuilderComponent;
  let fixture: ComponentFixture<UserViewBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewBuilderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
