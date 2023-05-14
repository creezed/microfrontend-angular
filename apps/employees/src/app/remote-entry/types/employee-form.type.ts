import { FormControl } from '@angular/forms';
import { EmployeePosition } from './employee-position.type';

export interface EmployeeForm {
  name: FormControl<string | null>;
  position: FormControl<{
    name: EmployeePosition;
    value: EmployeePosition;
  } | null>;
  salary: FormControl<string | null>;
}
