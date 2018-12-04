import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingListComponent } from './troubleshooting-list.component';

describe('TroubleshootingListComponent', () => {
  let component: TroubleshootingListComponent;
  let fixture: ComponentFixture<TroubleshootingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
