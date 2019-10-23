import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFilesComponent } from './main-files.component';

describe('MainFilesComponent', () => {
  let component: MainFilesComponent;
  let fixture: ComponentFixture<MainFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
