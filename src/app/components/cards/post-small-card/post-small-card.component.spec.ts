import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostSmallCardComponent } from './post-small-card.component';

describe('PostSmallCardComponent', () => {
  let component: PostSmallCardComponent;
  let fixture: ComponentFixture<PostSmallCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSmallCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
