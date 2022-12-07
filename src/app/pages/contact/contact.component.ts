import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {ApiService} from "../../services/api.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private snackBar: SnackbarService,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      content: ['', Validators.required],
      mobile: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }


  saveContactUs = async () => {
    if (this.userService.user && this.userService.userLoaded) {
      this.contactForm.controls.userId.setValue(this.userService.user.id);
    }
    const body = {...this.contactForm.value};
    console.log(body);
    const res = await this.apiService.sendRequest('POST', 'basic/saveContactUs/', body);
    if (res && res.status === 200) {
      this.contactForm.controls.name.setValue('');
      this.contactForm.controls.email.setValue('');
      this.contactForm.controls.content.setValue('');
      this.contactForm.controls.mobile.setValue('');
      this.contactForm.controls.userId.setValue('');
      this.snackBar.show('با موفقیت ثبت شد.', '', '', 2000);
    }

  }

}
