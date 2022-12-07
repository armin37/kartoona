import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWideCardComponent } from './post-wide-card.component';

describe('PostWideCardComponent', () => {
  let component: PostWideCardComponent;
  let fixture: ComponentFixture<PostWideCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWideCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
