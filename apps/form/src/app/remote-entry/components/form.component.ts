import { Component, HostBinding, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { UserFormState } from '../state/form.state';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFields, FormType } from '../types/form.type';
import { UserFormService } from '../services/form.service';

@Component({
  selector: 'practica-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Select(UserFormState.getCurrent) user$: Observable<User>;
  @Select(UserFormState.getPast) past$: Observable<User[]>;

  @HostBinding('class') classes = 'w-full';
  userForm;
  past: User[] = [];
  constructor(
    private fb: FormBuilder,
    public userFormService: UserFormService
  ) {
    this.userForm = this.fb.group<FormType>({
      [FormFields.firstName]: this.fb.control('', [Validators.required]),
      [FormFields.lastName]: this.fb.control('', [Validators.required]),
      [FormFields.birthDate]: this.fb.control(null, [Validators.required]),
    });
  }

  get _firstName() {
    return this.userForm.get('firstName');
  }

  get _lastName() {
    return this.userForm.get('lastName');
  }

  get _birthDate() {
    return this.userForm.get('birthDate');
  }

  ngOnInit(): void {
    this.user$.pipe().subscribe((user) => {
      const { firstName, lastName, birthDate } = user;
      this.userForm.patchValue({
        firstName,
        lastName,
        birthDate: birthDate ? new Date(birthDate) : null,
      });
    });

    this.past$.pipe().subscribe((past) => {
      this.past = past;
    });
  }

  onSave() {
    const { firstName, lastName, birthDate } = this.userForm.value;
    if (firstName && lastName && birthDate) {
      this.userFormService.save({
        firstName,
        lastName,
        birthDate: new Date(birthDate),
      });
    }
  }

  onRestore() {
    if (this.past.length === 0) return;
    const { firstName, lastName, birthDate } = this.userForm.value;
    if (firstName && lastName && birthDate) {
      this.userFormService.restore({ firstName, lastName, birthDate });
    }
  }
}
