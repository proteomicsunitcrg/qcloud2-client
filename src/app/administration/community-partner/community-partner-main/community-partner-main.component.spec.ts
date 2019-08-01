import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerMainComponent } from './community-partner-main.component';

describe('CommunityPartnerMainComponent', () => {
  let component: CommunityPartnerMainComponent;
  let fixture: ComponentFixture<CommunityPartnerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPartnerMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPartnerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
