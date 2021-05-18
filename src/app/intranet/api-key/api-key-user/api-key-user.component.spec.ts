import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyUserComponent } from './api-key-user.component';

describe('ApiKeyUserComponent', () => {
  let component: ApiKeyUserComponent;
  let fixture: ComponentFixture<ApiKeyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
