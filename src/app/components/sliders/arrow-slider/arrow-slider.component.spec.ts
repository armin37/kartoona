import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowSliderComponent } from './arrow-slider.component';

describe('ArrowSliderComponent', () => {
  let component: ArrowSliderComponent;
  let fixture: ComponentFixture<ArrowSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
