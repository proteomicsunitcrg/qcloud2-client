import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLineComponent } from './community-line.component';

describe('CommunityLineComponent', () => {
  let component: CommunityLineComponent;
  let fixture: ComponentFixture<CommunityLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
