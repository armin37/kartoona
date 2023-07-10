import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostSliderComponent } from './post-slider.component';

describe('PostSliderComponent', () => {
  let component: PostSliderComponent;
  let fixture: ComponentFixture<PostSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
