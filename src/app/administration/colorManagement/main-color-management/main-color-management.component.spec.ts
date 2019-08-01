import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainColorManagementComponent } from './main-color-management.component';

describe('MainColorManagementComponent', () => {
  let component: MainColorManagementComponent;
  let fixture: ComponentFixture<MainColorManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainColorManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainColorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
