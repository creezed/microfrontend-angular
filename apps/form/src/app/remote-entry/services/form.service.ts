import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { AddUser, Restore } from '../state/form.actions';

@Injectable()
export class UserFormService {
  constructor(private store: Store) {}
  public save(user: User) {
    this.store.dispatch(new AddUser(user));
  }
  public restore(user: User) {
    this.store.dispatch(new Restore(user));
  }
}
