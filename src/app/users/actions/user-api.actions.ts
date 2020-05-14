import { createAction, props } from '@ngrx/store';
import { User } from '../models';
import { Update } from '@ngrx/entity';

export const searchSuccess = createAction(
  '[User/API] Search Success',
  props<{ user: User[] }>()
);

export const searchFailure = createAction(
  '[User/API] Search Failure',
  props<{ errorMsg: string }>()
);

export const getUsers = createAction(
  '[Users/API] Load Users',
  props<{ users: User[] }>()
);

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }> ()
);

export const loadUsersFail = createAction(
  '[Users/API] Load Users Fail',
  props<{ errorMsg: string }>()
);

export const addUser = createAction(
  '[Users/API] Add User',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Users/API] Add User Success',
  props<{ user: User }>()
);

export const addUserFail = createAction(
  '[Users/API] Add User Fail',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[Users/API] Update User',
  props<{ user: Update<User> }>()
);

export const updateUserSuccess = createAction(
  '[Users/API] Update User Success',
  props<{ user: User }>()
);

export const updateUserFail = createAction(
  '[Users/API] Update User Fail',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users/API] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users/API] Delete User Success',
  props<{ user: User }>()
);

export const deleteUserFail = createAction(
  '[Users/API] Delete User Fail',
  props<{ user: User }>()
);