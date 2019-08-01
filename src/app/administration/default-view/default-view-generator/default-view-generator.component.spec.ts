import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultViewGeneratorComponent } from './default-view-generator.component';

describe('DefaultViewGeneratorComponent', () => {
  let component: DefaultViewGeneratorComponent;
  let fixture: ComponentFixture<DefaultViewGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultViewGeneratorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultViewGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
