import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaticAPI } from 'src/app/shared/helper/endPoints';
import { HttpService } from 'src/app/core/Services/http.service';
import { SnackBarService } from 'src/app/core/Services/snack-bar.service';
import {
  allowChartersOnly,
  createEmployeeFormErrors,
  createEmployeeFormvalidationMessages,
} from 'src/app/shared/helper/validations';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.sass'],
})
export class AddEditEmployeeComponent implements OnInit {
  employeeData: any;
  formErrors = createEmployeeFormErrors;
  validationMessages = createEmployeeFormvalidationMessages;
  isEdit: boolean;
  addEditEmployeeForm: FormGroup;
  breakpoint: number;
  employeeId: string;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _http: HttpService,
    private _snackBar: SnackBarService
  ) {
    this.addEditEmployeeForm = this._fb.group({
      firstName: ['',[Validators.required, Validators.pattern(allowChartersOnly)]],
      lastName: ['',[Validators.required, Validators.pattern(allowChartersOnly)]],
      address: [''],
      birthDate: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      city: [''],
    });

    this.employeeData = data.employeeData;
    if (this.employeeData) {
      this.isEdit = true;
      this.employeeId = this.employeeData.id;
      this.addEditEmployeeForm.patchValue(this.employeeData);
    }
  }

  ngOnInit(): void {
    this.addEditEmployeeForm.valueChanges.subscribe((data) => {
      this.validateAllFormFields(this.addEditEmployeeForm);
    });
  }
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  onSubmit() {
    if (this.addEditEmployeeForm.valid) {
      if (!this.isEdit) {
        this._http
          .POST_DATA(StaticAPI.addEmployee.url, this.addEditEmployeeForm.value)
          .subscribe((response) => {
            this._snackBar.successSnackBar('Employee created successfully!!');

            this.dialogRef.close(response);
          });
      } else {
        let obj = { id: +this.employeeId };
        Object.assign(obj, this.addEditEmployeeForm.value);
        this._http
          .PUT_DATA(
            StaticAPI.updateEmployee.url.replace(
              '@@EMPLOYEEID@@',
              this.employeeId
            ),
            obj
          )
          .subscribe((response) => {
            this._snackBar.successSnackBar('Employee updated successfully!!');
            this.dialogRef.close(response);
          });
      }
    } else {
      this.checkFormValidity();
    }
  }

  checkFormValidity() {
    this.validateAllFormFields(this.addEditEmployeeForm);
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
}
