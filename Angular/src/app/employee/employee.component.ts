import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'},
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];

import { range } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  employee: Employee
  source$ = range(0, 10);

  constructor(public employeeService: EmployeeService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.employee = employeeService.selectedEmployee;
  }

  ngOnInit(): void {
    this.resetForm()
    this.refreshEmployeeList()
    this.source$.pipe(
      filter(x => x % 2 === 0),
      map(x => x + x),
      scan((acc, x) => acc + x, 0)
    )
    .subscribe(x => console.log(x))
    this.source$.subscribe(x => console.log(typeof(x)))
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res
      // as Employee[]
      //viet cach 2 nhu o ben service thi ko can as Employee[]
    })
    this.employeeService.getEmployeeList().subscribe(
      next => console.log(typeof(next)),
      err => console.log(err),
      () => console.log('complete')
    )
    this.employeeService.getEmployeeList().pipe(
      map(res => res.map(x => console.log(x.name))))
    .subscribe()
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
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
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
        console.log('caasdrgh')
        console.log('casablanca')
      }
    });
  }

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<UsersData>(ELEMENT_DATA);

  @ViewChild(MatTable, {static:true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.dataSource)
      if (result.event == 'Add') {
        this.addRowData(result.data);
      }
      else if (result.event == 'Update') {
        this.updateRowData(result.data);
      }
      else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any){
    var d = new Date();
    this.dataSource.filteredData.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj: any){
    this.dataSource.filteredData = this.dataSource.filteredData.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: any){
    this.dataSource.filteredData = this.dataSource.filteredData.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}