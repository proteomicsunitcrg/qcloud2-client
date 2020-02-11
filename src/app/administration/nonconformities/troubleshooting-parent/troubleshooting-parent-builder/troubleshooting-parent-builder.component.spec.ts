import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingParentBuilderComponent } from './troubleshooting-parent-builder.component';

describe('TroubleshootingParentBuilderComponent', () => {
  let component: TroubleshootingParentBuilderComponent;
  let fixture: ComponentFixture<TroubleshootingParentBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingParentBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingParentBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
