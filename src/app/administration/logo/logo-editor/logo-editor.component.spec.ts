import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoEditorComponent } from './logo-editor.component';

describe('LogoEditorComponent', () => {
  let component: LogoEditorComponent;
  let fixture: ComponentFixture<LogoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
