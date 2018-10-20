import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit {

  empformlabel = 'Edit Employee';
  empformbtn = 'Update';
  constructor(private formBuilder: FormBuilder, private router: Router, private empService: EmployeeService) {
  }

  editForm: FormGroup;
  ngOnInit() {

    this.editForm = this.formBuilder.group({
      id: [],
      employee_name: ['', Validators.required],
      employee_salary: ['', [Validators.required, Validators.maxLength(9)]],
      employee_age: ['', [Validators.required, Validators.maxLength(3)]]
    });

    const empid = localStorage.getItem('editEmpId');
    if (+empid > 0) {
      this.empService.getEmployeeById(+empid).subscribe(data => {
        this.editForm.patchValue(data);
      });
    }
  }

  onUpdate() {

    console.log('Update fire');
    this.empService.updateEmployee(this.editForm.value).subscribe(data => {
      this.router.navigate(['list-emp']);
    },
      error => {
        alert(error);
      });
  }
}
