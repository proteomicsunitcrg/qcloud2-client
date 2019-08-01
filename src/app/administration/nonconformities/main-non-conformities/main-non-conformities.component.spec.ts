import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNonConformitiesComponent } from './main-non-conformities.component';

describe('MainNonConformitiesComponent', () => {
  let component: MainNonConformitiesComponent;
  let fixture: ComponentFixture<MainNonConformitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainNonConformitiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNonConformitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
