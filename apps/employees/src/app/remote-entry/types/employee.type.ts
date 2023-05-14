import { EmployeePosition } from './employee-position.type';

export interface Employee {
  id: string;
  name: string;
  position: EmployeePosition;
  salary: string;
}
