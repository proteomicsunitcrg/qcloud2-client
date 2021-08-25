import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyLsComponent } from './api-key-ls.component';

describe('ApiKeyLsComponent', () => {
  let component: ApiKeyLsComponent;
  let fixture: ComponentFixture<ApiKeyLsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyLsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
