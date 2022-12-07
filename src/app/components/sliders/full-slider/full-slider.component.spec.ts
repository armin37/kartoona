import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSliderComponent } from './full-slider.component';

describe('FullSliderComponent', () => {
  let component: FullSliderComponent;
  let fixture: ComponentFixture<FullSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
