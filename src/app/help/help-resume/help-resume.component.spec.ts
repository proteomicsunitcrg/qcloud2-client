import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpResumeComponent } from './help-resume.component';

describe('HelpResumeComponent', () => {
  let component: HelpResumeComponent;
  let fixture: ComponentFixture<HelpResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
