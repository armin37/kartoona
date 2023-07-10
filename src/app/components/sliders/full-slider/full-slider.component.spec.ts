import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullSliderComponent } from './full-slider.component';

describe('FullSliderComponent', () => {
  let component: FullSliderComponent;
  let fixture: ComponentFixture<FullSliderComponent>;

  beforeEach(waitForAsync(() => {
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
