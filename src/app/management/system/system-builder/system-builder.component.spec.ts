import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBuilderComponent } from './system-builder.component';

describe('SystemBuilderComponent', () => {
  let component: SystemBuilderComponent;
  let fixture: ComponentFixture<SystemBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
