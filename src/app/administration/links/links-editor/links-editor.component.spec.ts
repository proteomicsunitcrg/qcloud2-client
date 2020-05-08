import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksEditorComponent } from './links-editor.component';

describe('LinksEditorComponent', () => {
  let component: LinksEditorComponent;
  let fixture: ComponentFixture<LinksEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinksEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
