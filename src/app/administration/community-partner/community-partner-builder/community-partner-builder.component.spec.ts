import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerBuilderComponent } from './community-partner-builder.component';

describe('CommunityPartnerBuilderComponent', () => {
  let component: CommunityPartnerBuilderComponent;
  let fixture: ComponentFixture<CommunityPartnerBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityPartnerBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPartnerBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
