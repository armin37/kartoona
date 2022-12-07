import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SliderService} from 'src/app/services/slider/slider.service';
import * as cloneDeep from 'lodash/cloneDeep';
import {SwiperComponent} from 'swiper/angular';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  active = 'login';
  mobileMode = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  quickloginForm: FormGroup;
  sendCodeForm: FormGroup;
  forgetPasswordForm: FormGroup;
  mobilenumber = '';
  sliderConfig;
  sliderIndex = 2;
  callback = '/';
  disableButton: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private snackBar: SnackbarService,
              public sliderService: SliderService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('callback')) {
      this.callback = this.route.snapshot.queryParamMap.get('callback');
    }
    this.userService.userLoadedChange.subscribe(value => {
      console.log(this.userService.user);

      if (this.userService.user) {
        this.router.navigateByUrl('/profile');
      }
    });

    this.sliderConfig = cloneDeep(this.sliderService.slider1);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      remember: [true, Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])]
    });

    this.registerForm = this.formBuilder.group({
      phone_number: [{value: '', disabled: true}, Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
      uuid: [localStorage.getItem('uuid'), Validators.compose([Validators.required])],
    });

    this.quickloginForm = this.formBuilder.group({
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])]
    });

    this.sendCodeForm = this.formBuilder.group({
      phone_number: ['', Validators.required],
      code: ['', Validators.required]
    });

    // forget password
    this.forgetPasswordForm = this.formBuilder.group({
      phone_number: [{value: '', disabled: true}, Validators.required],
      validationCode: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])]
    });
  }

  forgetPassword = async () => {
    const body = {...this.quickloginForm.value};
    this.userService.sendValidationCode(body);
    this.forgetPasswordForm.controls.phone_number.setValue(this.quickloginForm.controls.phone_number.value);
    this.sliderIndex = 4;
    this.swiper.index = 4;
  };

  sendForgetPassword = async () => {
    const body = {...this.forgetPasswordForm.value};
    this.sliderIndex = 5;
    this.swiper.index = 5;
  };

  checkUserExists = async () => {
    if (this.quickloginForm.valid) {
      this.changeStatusButton(true);
      const body = {...this.quickloginForm.value};
      const res: any = await this.userService.checkUserExists(body);
      if (res.status === 200) {
        this.loginForm.controls.username.setValue(this.quickloginForm.controls.phone_number.value);
        this.sliderIndex = 3;
        this.swiper.index = 3;
      } else if (res.status === 404) {
        this.userService.sendValidationCode(body);
        this.sendCodeForm.controls.phone_number.setValue(this.quickloginForm.controls.phone_number.value);
        this.sliderIndex = 1;
        this.swiper.index = 1;
        this.snackBar.show('کد تایید برای شما ارسال شد');
      }
      this.changeStatusButton(false);
    } else {
      this.snackBar.show('شماره موبایل را به درستی وارد کنید');
    }
  };

  sendCode = async () => {
    const body = {...this.quickloginForm.value};
    const res: any = this.userService.sendValidationCode(body);
    if (res) {
    }
  };

  validateCode = async () => {
    this.changeStatusButton(true);
    const body = {...this.sendCodeForm.value};
    const res: any = await this.userService.checkValidationCode(body);
    if (res && res.status === 200) {
      this.registerForm.controls.phone_number.setValue(this.sendCodeForm.controls.phone_number.value);
      this.sliderIndex = 0;
      this.swiper.index = 0;
    } else {
      this.snackBar.show('کد وارد شده اشتباه است');
    }
    this.changeStatusButton(false);
  };

  validateResetCode = async () => {
    const body = {...this.sendCodeForm.value};
    this.sliderIndex = 6;
    this.swiper.index = 6;
  };

  resetPassword = async () => {
    this.changeStatusButton(true);
    if (this.forgetPasswordForm.valid) {
      const body = {
        'phone_number': this.forgetPasswordForm.controls.phone_number.value,
        'password': this.forgetPasswordForm.controls.password.value,
        'validationCode': this.forgetPasswordForm.controls.validationCode.value
      };
      const res: any = await this.userService.forgetPassword(body);
      if (res && res.status === 200) {
        this.router.navigateByUrl(this.callback);
      }
    } else {
      this.snackBar.show('اطلاعات خواسته شده را وارد کنید');
    }
    this.changeStatusButton(false);
  };

  register = async () => {
    this.changeStatusButton(true);
    const body = {...this.registerForm.value};
    body.phone_number = this.registerForm.controls.phone_number.value;
    if (this.registerForm.valid) {
      const res: any = await this.userService.register(body);
      if (res && res.status === 200) {
        this.router.navigateByUrl(this.callback);
        this.snackBar.show('ثبت نام با موفقیت انجام شد');
      }
    } else {
      this.snackBar.show('اطلاعات خواسته شده را به درستی وارد کنید');
    }
    this.changeStatusButton(false);
  };

  login = async () => {
    this.changeStatusButton(true);
    const body = {...this.loginForm.value};
    if (this.loginForm.valid) {
      let res = await this.userService.login(body, this.loginForm.controls.remember.value);
      if (res) {
        this.router.navigateByUrl(this.callback);
        this.snackBar.show('با موفقیت وارد شدید');
      } else {
        this.snackBar.show('نام کاربری یا رمز عبور اشتباه است');
      }
    } else {
      this.snackBar.show('شماره موبایل و رمز عبور را وارد کنید');
    }
    this.changeStatusButton(false);
  };

  changeStatusButton(state) {
    this.disableButton = state;
  }


  togglePassword = (type) => {
    // console.log(this.lpIcon)
    // if (type === 'login') {
    //   if (this.lpInput.nativeElement.type === 'password') {
    //     this.lpInput.nativeElement.type = 'text';
    //     this.lpIcon.nativeElement.className = this.lpIcon.nativeElement.className.replace('fa-eye', 'fa-eye-slash')
    //   } else {
    //     this.lpInput.nativeElement.type = 'password';
    //     this.lpIcon.nativeElement.className = this.lpIcon.nativeElement.className.replace('fa-eye-slash', 'fa-eye')
    //   }
    // }
    // if (type === 'signup') {
    //   if (this.suInput.nativeElement.type === 'password') {
    //     this.suInput.nativeElement.type = 'text';
    //     this.suIcon.nativeElement.className = this.suIcon.nativeElement.className.replace('fa-eye', 'fa-eye-slash')
    //   } else {
    //     this.suInput.nativeElement.type = 'password';
    //     this.suIcon.nativeElement.className = this.suIcon.nativeElement.className.replace('fa-eye-slash', 'fa-eye')
    //   }
    // }
  };

}
