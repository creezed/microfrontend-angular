import { FormControl } from '@angular/forms';

export enum FormFields {
  firstName = 'firstName',
  lastName = 'lastName',
  birthDate = 'birthDate',
}

export interface FormType {
  [FormFields.firstName]: FormControl<string | null>;
  [FormFields.lastName]: FormControl<string | null>;
  [FormFields.birthDate]: FormControl<Date | null>;
}
