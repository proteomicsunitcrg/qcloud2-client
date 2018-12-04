import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingFormComponent } from './troubleshooting-form.component';

describe('TroubleshootingFormComponent', () => {
  let component: TroubleshootingFormComponent;
  let fixture: ComponentFixture<TroubleshootingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
