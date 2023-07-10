import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import {BlogSingleComponent} from './blog-single.component';
import {BlogService} from '../../services/blog.service';
import {SnackbarService} from '../../services/snackbar.service';
import {UserService} from '../../services/user.service';
import {SliderService} from '../../services/slider/slider.service';
import {HeaderVariablesService} from '../../services/header-variables.service';

describe('BlogSingleComponent', () => {
  let component: BlogSingleComponent;
  let fixture: ComponentFixture<BlogSingleComponent>;
  let blogServiceStub: Partial<BlogService>;
  let snackbarServiceStub: Partial<SnackbarService>;
  let userServiceStub: Partial<UserService>;
  let sliderServiceStub: Partial<SliderService>;
  let headerServiceStub: Partial<HeaderVariablesService>;

  beforeEach(waitForAsync(() => {
    blogServiceStub = {};
    snackbarServiceStub = {};
    userServiceStub = {};
    sliderServiceStub = {};
    headerServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [BlogSingleComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: BlogService, useValue: blogServiceStub},
        {provide: SnackbarService, useValue: snackbarServiceStub},
        {provide: UserService, useValue: userServiceStub},
        {provide: SliderService, useValue: sliderServiceStub},
        {provide: HeaderVariablesService, useValue: headerServiceStub}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
