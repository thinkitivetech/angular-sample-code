import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.sass'],
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() employeeId: string;
  @Output() onDeleteEmployee = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void { }

  deleleBtnClick() {
    this.onDeleteEmployee.emit(this.employeeId);
  }
}
