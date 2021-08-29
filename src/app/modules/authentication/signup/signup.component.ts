import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaticAPI } from 'src/app/shared/helper/endPoints';
import { HttpService } from 'src/app/core/Services/http.service';
import { SnackBarService } from 'src/app/core/Services/snack-bar.service';
import {
  allowChartersOnly,
  allowedMailPattern,
  signupFormErrors,
  signUpFormvalidationMessages,
} from 'src/app/shared/helper/validations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  formErrors: any = signupFormErrors;
  validationMessages: any = signUpFormvalidationMessages;
  hide = true;
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(allowedMailPattern),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(allowChartersOnly),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(allowChartersOnly),
    ]),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
  });
  constructor(
    private _router: Router,
    private _http: HttpService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe((data) => {
      this.validateAllFormFields(this.signupForm);
    });
  }

  isFieldValid(field: string) {
    return (
      this.signupForm.get(field).invalid &&
      (this.signupForm.get(field).touched || this.signupForm.get(field).dirty)
    );
  }

  checkFormValidity() {
    this.validateAllFormFields(this.signupForm);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateAllFormFields(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  submit() {
    if (this.signupForm.valid) {
      this._http
        .POST_DATA(StaticAPI.signup.url, this.signupForm.value)
        .subscribe((response) => {
          this._snackBar.successSnackBar('Signup successfull!');
          this._router.navigateByUrl(`login`);
        });
    } else {
      this.checkFormValidity;
    }
  }

  navigateToLogin() {
    this._router.navigateByUrl(`login`);
  }
}
