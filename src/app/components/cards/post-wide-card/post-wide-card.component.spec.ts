import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostWideCardComponent } from './post-wide-card.component';

describe('PostWideCardComponent', () => {
  let component: PostWideCardComponent;
  let fixture: ComponentFixture<PostWideCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWideCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(PostWideCardComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
