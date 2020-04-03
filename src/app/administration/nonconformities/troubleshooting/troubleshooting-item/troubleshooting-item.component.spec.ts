import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingItemComponent } from './troubleshooting-item.component';

describe('TroubleshootingItemComponent', () => {
  let component: TroubleshootingItemComponent;
  let fixture: ComponentFixture<TroubleshootingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootingItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
