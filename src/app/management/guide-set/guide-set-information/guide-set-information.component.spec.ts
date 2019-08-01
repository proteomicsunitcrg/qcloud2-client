import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideSetInformationComponent } from './guide-set-information.component';

describe('GuideSetInformationComponent', () => {
  let component: GuideSetInformationComponent;
  let fixture: ComponentFixture<GuideSetInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuideSetInformationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideSetInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
