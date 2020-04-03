import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingEditorComponent } from './troubleshooting-editor.component';

describe('TroubleshootingEditorComponent', () => {
  let component: TroubleshootingEditorComponent;
  let fixture: ComponentFixture<TroubleshootingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootingEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
