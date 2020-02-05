import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingParentMainComponent } from './troubleshooting-parent-main.component';

describe('TroubleshootingParentMainComponent', () => {
  let component: TroubleshootingParentMainComponent;
  let fixture: ComponentFixture<TroubleshootingParentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingParentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingParentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
