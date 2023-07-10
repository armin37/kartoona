import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AuthComponent} from './auth.component';

import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../services/user.service';
import {SnackbarService} from '../../services/snackbar.service';
import {SliderService} from '../../services/slider/slider.service';
import {BlogService} from '../../services/blog.service';
import {HeaderVariablesService} from '../../services/header-variables.service';
import {Subject} from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let snackbarServiceStub: Partial<SnackbarService>;
  let userServiceStub: Partial<UserService>;
  let sliderService: SliderService;

  beforeEach(waitForAsync(() => {
    snackbarServiceStub = {};
    userServiceStub = {
      userLoadedChange: new Subject<boolean>()
    };

    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: SnackbarService, useValue: snackbarServiceStub},
        {provide: UserService, useValue: userServiceStub}
      ],
    })
      .compileComponents();

    sliderService = TestBed.inject(SliderService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
