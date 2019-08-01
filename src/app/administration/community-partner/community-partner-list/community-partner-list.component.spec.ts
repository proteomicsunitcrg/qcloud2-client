import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerListComponent } from './community-partner-list.component';

describe('CommunityPartnerListComponent', () => {
  let component: CommunityPartnerListComponent;
  let fixture: ComponentFixture<CommunityPartnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPartnerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
