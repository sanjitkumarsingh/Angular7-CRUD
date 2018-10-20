import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.scss']
})
export class ListEmpComponent implements OnInit {

  employees: Employee[];
  constructor(private empService: EmployeeService, private router: Router, ) { }

  ngOnInit() {
    this.empService.getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }
  deleteEmp(employee: Employee): void {
    this.empService.deleteEmployees(employee.id)
      .subscribe(data => {
        this.employees = this.employees.filter(u => u !== employee);
      });
  }
  editEmp(employee: Employee): void {
    localStorage.removeItem('editEmpId');
    localStorage.setItem('editEmpId', employee.id.toString());
    this.router.navigate(['update-emp']);
  }

  addEmp(): void {
    localStorage.removeItem('editEmpId');
    this.router.navigate(['add-emp']);
  }
}
