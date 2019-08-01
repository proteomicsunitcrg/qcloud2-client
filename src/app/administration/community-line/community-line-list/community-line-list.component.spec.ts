import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLineListComponent } from './community-line-list.component';

describe('CommunityLineListComponent', () => {
  let component: CommunityLineListComponent;
  let fixture: ComponentFixture<CommunityLineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityLineListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
