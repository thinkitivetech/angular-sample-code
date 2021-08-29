import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StaticAPI } from 'src/app/shared/helper/endPoints';
import { HttpService } from 'src/app/core/Services/http.service';
import { SnackBarService } from 'src/app/core/Services/snack-bar.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.sass'],
})
export class EmployeeDetailsComponent implements OnInit {
  employees;
  displayedColumns: string[] = [
    'First Name',
    'Last Name',
    'Address',
    'Birth Date',
    'Mobile',
    'City',
    'Actions',
  ];
  employeeId: number;

  paymentHandler: any = null;

  constructor(
    private _http: HttpService,
    private dialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
    this.invokeStripe();
  }

  getEmployeeList() {
    this._http
      .GET_DATA(StaticAPI.getEmployees.url)
      .subscribe((response: Employee[]) => {
        this.employees = new MatTableDataSource(response);
      });
  }

  onAddEditEmployee(data?) {
    let dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      width: '50vh',
      height: 'auto',
      disableClose: false,
      data: { employeeData: data },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.employees = new MatTableDataSource(response);
      }
    });
  }

  onDeleteBtnClick(employeeId) {
    this.employeeId = +employeeId;
  }

  // method on output event
  deleteEmployee(id) {
    this._http
      .DELETE_DATA(StaticAPI.deleteEmployee.url.replace('@@EMPLOYEEID@@', id))
      .subscribe((response: Employee[]) => {
        this._snackBar.successSnackBar('Employee deleted successfully!!');
        this.employees = new MatTableDataSource(response);
      });
  }

  makePayment(amount) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
      locale: 'auto',
      token: function (stripeToken: any) {
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: +amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
