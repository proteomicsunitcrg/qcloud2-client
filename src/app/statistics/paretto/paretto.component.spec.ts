import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParettoComponent } from './paretto.component';

describe('ParettoComponent', () => {
  let component: ParettoComponent;
  let fixture: ComponentFixture<ParettoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParettoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
