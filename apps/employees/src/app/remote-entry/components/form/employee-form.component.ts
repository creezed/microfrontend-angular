import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employeePosition } from '../../shared/consts/employee-position.const';
import { EmployeeForm } from '../../types/employee-form.type';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../types/employee.type';
import { EmployeeService } from '../../services/employee.service';
import { nanoid } from 'nanoid';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'practica-employee-form',
  templateUrl: 'employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  protected readonly employeePosition = employeePosition;
  employeeForm: FormGroup;
  buttonLabel: string;

  @Input() employee: Employee;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  handleUpdate = (employee: Employee) => {
    this.employeeService
      .updateEmployee(employee)
      .pipe()
      .subscribe(() => {
        this.router.navigate(['/employees']);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Умпешное обновлние',
        });
      });
  };

  handleCreate = (employee: Employee) => {
    this.employeeService
      .addEmployee(employee)
      .pipe()
      .subscribe(() => {
        this.router.navigate(['/employees']);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Умпешное создание',
        });
      });
  };
  ngOnInit() {
    this.employeeForm = this.fb.group<EmployeeForm>({
      name: this.fb.control(this.employee?.name || '', [Validators.required]),
      position: this.fb.control(
        this.employee?.position
          ? { name: this.employee.position, value: this.employee.position }
          : null,
        [Validators.required]
      ),
      salary: this.fb.control(this.employee?.salary || '', [
        Validators.required,
      ]),
    });

    if (this.employee) {
      this.buttonLabel = 'Обновить';
    } else {
      this.buttonLabel = 'Создать';
    }
  }

  get _name() {
    return this.employeeForm.get('name');
  }
  get _position() {
    return this.employeeForm.get('position');
  }
  get _salary() {
    return this.employeeForm.get('salary');
  }
  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.employee && id) {
      this.handleUpdate({
        ...this.employeeForm.value,
        id: id,
        position: this._position?.value.value,
      });
    } else {
      this.handleCreate({
        ...this.employeeForm.value,
        id: nanoid(),
        position: this._position?.value.value,
      });
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
