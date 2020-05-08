import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksBuilderComponent } from './links-builder.component';

describe('LinksBuilderComponent', () => {
  let component: LinksBuilderComponent;
  let fixture: ComponentFixture<LinksBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
