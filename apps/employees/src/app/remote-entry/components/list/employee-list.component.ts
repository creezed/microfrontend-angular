import { Component, OnInit } from '@angular/core';
import { Employee } from '../../types/employee.type';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { delay } from 'rxjs';

@Component({
  selector: 'practica-employee-list',
  templateUrl: 'employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .pipe(delay(300))
      .subscribe((employees) => {
        this.employees = employees;
        this.loading = false;
      });
  }

  editEmployee(employee: Employee) {
    this.router.navigate([`/employees/edit/${employee.id}`]);
  }

  deleteEmployee(id: string) {
    this.confirmationService.confirm({
      message: 'Вы точно хотите удалить этоого сотрудника?',
      header: 'Подтверждение удаления',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.employeeService
          .removeEmployee(id)
          .pipe()
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: 'Умпешное удаление',
            });
            this.employees = this.employees.filter(
              (employee) => employee.id !== id
            );
          });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Отмена',
              detail: 'Вы отменили действие',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Отмена',
              detail: 'Вы отменили действие',
            });
            break;
        }
      },
    });
  }
}
