import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee = {    
    _id: '',
    name: '',
    position: '',
    office: '',
    salary: 0
  };
  employees!: Employee[]

  readonly baseURL = 'http://localhost:3000/employees'

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee){
    return this.http.post(this.baseURL, emp)
  }

  getEmployeeList(): Observable<Employee[]> {
    //console.log(this.http.get(this.baseURL))
    //co the viet la
    return this.http.get<Employee[]>(this.baseURL)
    //khi do ham se la
    // getEmployeeList(): Observable<Employee[]>{}
    //return this.http.get(this.baseURL)
  }

  putEmployee(emp: Employee){
    return this.http.put(`${this.baseURL}/${emp._id}`, emp)
  }

  deleteEmployee(_id: string){
    return this.http.delete(`${this.baseURL}/${_id}`)
  }
}
