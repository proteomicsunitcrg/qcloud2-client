import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsMapComponent } from './maps-map.component';

describe('MapsMapComponent', () => {
  let component: MapsMapComponent;
  let fixture: ComponentFixture<MapsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
