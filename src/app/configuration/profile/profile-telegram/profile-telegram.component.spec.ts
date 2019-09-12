import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTelegramComponent } from './profile-telegram.component';

describe('ProfileTelegramComponent', () => {
  let component: ProfileTelegramComponent;
  let fixture: ComponentFixture<ProfileTelegramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTelegramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTelegramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
