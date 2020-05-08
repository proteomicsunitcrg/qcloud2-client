import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNewComponent } from './logo-new.component';

describe('LogoNewComponent', () => {
  let component: LogoNewComponent;
  let fixture: ComponentFixture<LogoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
