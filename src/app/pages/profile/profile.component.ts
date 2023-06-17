import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ApiService} from '../../services/api.service';
import {LazyLoadEvent} from 'primeng/api/public_api';
import {MovieService} from 'src/app/services/movie.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {async} from '@angular/core/testing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  generalInfoForm: FormGroup;
  changePassForm: FormGroup;
  deleteAccountForm: FormGroup;
  changePgForm: FormGroup;

  pgList: [];
  favoriteList: [];

  payments: [];
  paymentsTotalRecords: number;

  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              public userService: UserService,
              public movieService: MovieService,
              private snackBarService: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.generalInfoForm = this.formBuilder.group({
      phone_number: [{value: '', disabled: true}],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['']
    });

    this.changePgForm = this.formBuilder.group({
      pgId: [''],
      password: ['', Validators.required],
    });

    if (!this.userService.user && !this.userService.userLoaded) {
      this.userService.userLoadedChange.subscribe(value => {
        this.generalInfoForm.controls.first_name.setValue(this.userService.user.first_name);
        this.generalInfoForm.controls.last_name.setValue(this.userService.user.last_name);
        this.generalInfoForm.controls.email.setValue(this.userService.user.email);
        this.generalInfoForm.controls.phone_number.setValue(this.userService.user.phone_number);
        this.changePgForm.controls.pgId.setValue(this.userService.user.pg_id);
      });
    } else {
      this.generalInfoForm.controls.first_name.setValue(this.userService.user.first_name);
      this.generalInfoForm.controls.last_name.setValue(this.userService.user.last_name);
      this.generalInfoForm.controls.email.setValue(this.userService.user.email);
      this.generalInfoForm.controls.phone_number.setValue(this.userService.user.phone_number);
      this.changePgForm.controls.pgId.setValue(this.userService.user.pg_id);
    }

    this.changePassForm = this.formBuilder.group({
      old_pass: ['', Validators.required],
      new_pass: ['', Validators.required],
      new_pass_conf: ['', Validators.required]
    });

    this.deleteAccountForm = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.loadUserPayments(null);
    this.loadUserFavorites();
    this.loadAllPgs();
  }

  updateGeneralInfo = async () => {
    if (this.generalInfoForm.valid) {
      const body = {...this.generalInfoForm.value};
      let res = await this.userService.updateGeneralInfo(body);
      if (res) {
        this.snackBarService.show('اطلاعات کاربری با موفقیت به‌روزرسانی شد');
      }
    }
  };

  updatePassword = async () => {
    if (this.changePassForm.valid) {
      const body = {...this.changePassForm.value};

      if (body.new_pass !== body.new_pass_conf) {
        this.snackBarService.show('رمز عبور جدید و تکرار آن برابر نیستند');
        return;
      }
      let res = await this.userService.changePassword(body);
      if (res) {
        this.snackBarService.show('رمز عبور با موفقیت عوض شد');
      }
    }
  };

  deleteAccount = async () => {
    if (this.deleteAccountForm.valid) {
      const body = {...this.deleteAccountForm.value};

      let res = await this.userService.deleteAccount(body);
      if (res) {
        this.router.navigateByUrl('/');
      }
    }
  };

  updatePg = async () => {
    if (this.changePgForm.valid) {
      const body = {...this.changePgForm.value};
      let res = await this.userService.updatePg(body);
      if (res) {
        this.snackBarService.show('رده سنی با موفقیت عوض شد');
        this.userService.loadLogedInUser();
      }
    }
  };

  // loadActivePlan = async () => {
  //   this.activePlan = await this.userService.loadUserActivePlan();
  // }

  loadUserFavorites = async () => {
    this.favoriteList = await this.userService.loadUserFavorites();
  };

  loadAllPgs = async () => {
    this.pgList = await this.movieService.loadAllPgs();
  };

  loadUserPayments = async (event: LazyLoadEvent) => {
    this.loading = true;
    let first = 0;
    let rows = 10;
    let sortField = null;
    if (event != null) {
      first = event.first;
      rows = event.rows;
      sortField = event.sortField;
    }
    let body = {
      'first': first,
      'rows': rows,
      'sortField': sortField,
    };
    this.payments = await this.userService.loadUserPayments(body);
    this.loading = false;
  };
}
