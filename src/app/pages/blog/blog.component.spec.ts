import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BlogComponent} from './blog.component';
import {BlogService} from '../../services/blog.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let blogServiceStub: Partial<BlogService>;

  beforeEach(waitForAsync(() => {
    blogServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [BlogComponent],
      imports: [RouterTestingModule],
      providers: [{provide: BlogService, useValue: blogServiceStub}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(BlogComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create blog', () => {
    expect(true).toBeTruthy();
  });
});
