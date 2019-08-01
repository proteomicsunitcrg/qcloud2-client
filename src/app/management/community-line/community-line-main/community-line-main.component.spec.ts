import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLineMainComponent } from './community-line-main.component';

describe('CommunityLineMainComponent', () => {
  let component: CommunityLineMainComponent;
  let fixture: ComponentFixture<CommunityLineMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityLineMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLineMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
