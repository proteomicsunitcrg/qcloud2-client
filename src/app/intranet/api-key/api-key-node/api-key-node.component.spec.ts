import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyNodeComponent } from './api-key-node.component';

describe('ApiKeyNodeComponent', () => {
  let component: ApiKeyNodeComponent;
  let fixture: ComponentFixture<ApiKeyNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
