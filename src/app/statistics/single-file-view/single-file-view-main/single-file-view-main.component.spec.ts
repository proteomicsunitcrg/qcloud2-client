import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileViewMainComponent } from './single-file-view-main.component';

describe('SingleFileViewMainComponent', () => {
  let component: SingleFileViewMainComponent;
  let fixture: ComponentFixture<SingleFileViewMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFileViewMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFileViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
