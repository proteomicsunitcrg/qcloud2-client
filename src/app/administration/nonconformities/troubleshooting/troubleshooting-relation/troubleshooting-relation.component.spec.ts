import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingRelationComponent } from './troubleshooting-relation.component';

describe('TroubleshootingRelationComponent', () => {
  let component: TroubleshootingRelationComponent;
  let fixture: ComponentFixture<TroubleshootingRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TroubleshootingRelationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
