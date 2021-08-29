import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaticAPI } from 'src/app/shared/helper/endPoints';
import { HttpService } from 'src/app/core/Services/http.service';
import { SnackBarService } from 'src/app/core/Services/snack-bar.service';
import { allowedMailPattern, loginFormErrors, loginFormvalidationMessages, } from 'src/app/shared/helper/validations';
import { AuthService } from 'src/app/core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  formErrors = loginFormErrors;
  validationMessages = loginFormvalidationMessages;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(allowedMailPattern),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  hide: boolean = true;

  constructor(
    private _router: Router,
    private _snackBar: SnackBarService,
    private _http: HttpService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((data) => {
      this.validateAllFormFields(this.loginForm);
    });
  }

  isFieldValid(field: string) {
    return (
      this.loginForm.get(field).invalid &&
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)
    );
  }

  checkFormValidity() {
    this.validateAllFormFields(this.loginForm);
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
    if (this.loginForm.valid) {
      this._http
        .POST_DATA(StaticAPI.login.url, this.loginForm.value)
        .subscribe((response: any) => {
          this._snackBar.successSnackBar('login successfull!');
          this._auth.setDataToStorage(response.data)
          this._router.navigate(['home']);
        });
    } else {
      this.checkFormValidity();
    }
  }

  navigateToSignUp() {
    this._router.navigateByUrl(`signup`);
  }
}
