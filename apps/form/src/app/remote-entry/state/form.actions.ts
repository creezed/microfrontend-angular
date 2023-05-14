import { User } from '../types/user.type';

export class AddUser {
  static readonly type = '[User] AddUser';
  constructor(public payload: User) {}
}

export class Restore {
  static readonly type = '[User] Restore';
  constructor(public payload: User) {}
}
