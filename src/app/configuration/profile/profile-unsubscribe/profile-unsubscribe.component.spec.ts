import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUnsubscribeComponent } from './profile-unsubscribe.component';

describe('ProfileUnsubscribeComponent', () => {
  let component: ProfileUnsubscribeComponent;
  let fixture: ComponentFixture<ProfileUnsubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUnsubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
