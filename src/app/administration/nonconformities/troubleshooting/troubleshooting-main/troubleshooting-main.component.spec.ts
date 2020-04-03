import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingMainComponent } from './troubleshooting-main.component';

describe('TroubleshootingMainComponent', () => {
  let component: TroubleshootingMainComponent;
  let fixture: ComponentFixture<TroubleshootingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootingMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
