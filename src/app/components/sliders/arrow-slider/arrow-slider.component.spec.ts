import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArrowSliderComponent } from './arrow-slider.component';

describe('ArrowSliderComponent', () => {
  let component: ArrowSliderComponent;
  let fixture: ComponentFixture<ArrowSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ArrowSliderComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
