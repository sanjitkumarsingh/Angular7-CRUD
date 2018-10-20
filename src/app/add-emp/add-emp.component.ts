import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {

  empformlabel = 'Add Employee';
  empformbtn = 'Save';
  constructor(private formBuilder: FormBuilder, private router: Router, private empService: EmployeeService) {}

  addForm: FormGroup;
  btnvisibility = true;
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      employee_name: ['', Validators.required],
      employee_salary: ['', [Validators.required, Validators.maxLength(9)]],
      employee_age: ['', [Validators.required, Validators.maxLength(3)]]
    });

  }
  onSubmit() {
    console.log('Create fire');
    this.empService.createUser(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-emp']);
      },
      error => {
        alert(error);
      });
  }
}
