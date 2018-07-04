import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewListComponent } from './user-view-list.component';

describe('UserViewListComponent', () => {
  let component: UserViewListComponent;
  let fixture: ComponentFixture<UserViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
