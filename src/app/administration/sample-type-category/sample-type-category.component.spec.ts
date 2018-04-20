import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeCategoryComponent } from './sample-type-category.component';

describe('SampleTypeCategoryComponent', () => {
  let component: SampleTypeCategoryComponent;
  let fixture: ComponentFixture<SampleTypeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTypeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
