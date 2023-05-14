import {Action, Selector, State, StateContext, StateToken} from "@ngxs/store";
import {User} from "../types/user.type";
import {Injectable} from "@angular/core";
import {AddUser, Restore} from "./form.actions";
import { isEqual } from 'lodash';

export interface UserFormStateModel {
  current?: User;
  past: User[];
}

const FORM_STATE_TOKEN = new StateToken<UserFormStateModel>('form');

const defaultUserState = {
  firstName: '',
  lastName: '',
  birthDate: null,
};

@State<UserFormStateModel>({
  name: FORM_STATE_TOKEN,
  defaults: {
    current: undefined,
    past: [],
  },
})
@Injectable()
export class UserFormState {
  @Selector()
  static getCurrent(state: UserFormStateModel): User {
    return state.current || defaultUserState;
  }

  @Selector()
  static getPast(state: UserFormStateModel): User[] {
    return state.past;
  }

  @Action(AddUser)
  addUser(
    { patchState, getState }: StateContext<UserFormStateModel>,
    { payload }: AddUser
  ) {
    const state = getState();
    let past = [...state.past];

    // If the length of the saved ones is greater than or equal to 4, then delete the last element
    if (past.length >= 4) {
      past = past.slice(1);
    }

    // If this is the first time the application is open, enter the same value as in the form
    if (!state.current) {
      past.push(payload);
    } else if (!isEqual(past[past.length - 1], state.current)) {
      past.push(state.current);
    }

    patchState({
      current: payload,
      past: past,
    });
  }

  @Action(Restore)
  restore(
    { patchState, getState }: StateContext<UserFormStateModel>,
    { payload }: Restore
  ) {
    const state = getState();
    const past: User[] = [...state.past];
    let current: User;

    if (state.current && !isEqual(state.current, payload)) {
      current = state.current;
    } else {
      current = past[past.length - 1];
    }

    if (state.current == current) {
      patchState({
        current: payload,
      });
    }

    patchState({
      current: current,
      past: past.slice(0, -1),
    });
  }
}
