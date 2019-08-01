import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLineBuilderComponent } from './community-line-builder.component';

describe('CommunityLineBuilderComponent', () => {
  let component: CommunityLineBuilderComponent;
  let fixture: ComponentFixture<CommunityLineBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityLineBuilderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLineBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
