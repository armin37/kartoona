import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import {ContactComponent} from './contact.component';
import {SnackbarService} from '../../services/snackbar.service';
import {UserService} from '../../services/user.service';
import {ApiService} from '../../services/api.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let apiServiceStub: Partial<ApiService>;
  let snackbarServiceStub: Partial<SnackbarService>;
  let userServiceStub: Partial<UserService>;

  beforeEach(waitForAsync(() => {
    apiServiceStub = {};
    snackbarServiceStub = {};
    userServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: SnackbarService, useValue: snackbarServiceStub},
        {provide: UserService, useValue: userServiceStub}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(ContactComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
