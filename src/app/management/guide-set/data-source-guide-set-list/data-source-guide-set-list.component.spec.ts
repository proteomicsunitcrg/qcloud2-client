import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceGuideSetListComponent } from './data-source-guide-set-list.component';

describe('DataSourceGuideSetListComponent', () => {
  let component: DataSourceGuideSetListComponent;
  let fixture: ComponentFixture<DataSourceGuideSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceGuideSetListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceGuideSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
