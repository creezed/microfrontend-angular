import { Component, HostBinding, OnInit } from '@angular/core';
import { Employee } from '../../types/employee.type';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { delay } from 'rxjs';

@Component({
  selector: 'practica-employees-add-edit-page',
  templateUrl: './add-edit-page.component.html',
})
export class AddEditPageComponent implements OnInit {
  title: string;
  employee: Employee;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  @HostBinding('class') classes = 'w-full';
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Обновление';
      this.employeeService
        .getEmployee(id)
        .pipe(delay(400))
        .subscribe((employee) => {
          this.employee = employee;
          this.loading = false;
        });
    } else {
      this.loading = false;
      this.title = 'Создание';
    }
  }
}
