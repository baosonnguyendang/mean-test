import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  employee: Employee

  constructor(public employeeService: EmployeeService, private _snackBar: MatSnackBar) {
    this.employee = employeeService.selectedEmployee;
  }

  ngOnInit(): void {
    this.resetForm()
    this.refreshEmployeeList()
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[]
    })
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form)
        this.refreshEmployeeList()
        this.openSnackBar('a', 'b')
      })
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form)
        this.refreshEmployeeList()
        this.openSnackBar('a', 'c')
      })
    }
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset()
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: 0,
      }
    }
  }

  log(x: any){
    console.log(x);
  }

  onEdit(emp: Employee){
    this.employee = emp;
  }

  onDelete(_id: string, form: NgForm){
    this.employeeService.deleteEmployee(_id).subscribe((res) => {
      this.refreshEmployeeList()
      this.resetForm(form)
      this.openSnackBar('a', 'd')
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    }).onAction().subscribe(() => {
      if (action === 'b') {
        console.log('The snack-bar action was triggered!');
      }
      else {
        console.log('cac')
      }
    });
  }
}
