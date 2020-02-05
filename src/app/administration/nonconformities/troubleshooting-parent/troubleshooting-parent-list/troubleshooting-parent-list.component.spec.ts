import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingParentListComponent } from './troubleshooting-parent-list.component';

describe('TroubleshootingParentListComponent', () => {
  let component: TroubleshootingParentListComponent;
  let fixture: ComponentFixture<TroubleshootingParentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingParentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
