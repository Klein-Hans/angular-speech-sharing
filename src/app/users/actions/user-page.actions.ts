import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const loadUsers = createAction('[User Module] Load Users',);

export const selectUser = createAction(
  '[User Module] Select User',
  props<{ id: string }>()
);

export const updateUser = createAction(
  '[Selected User] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Selected User] Remove User',
  props<{ user: User }>()
);

export const addUser = createAction(
  '[New User] Add User',
  props<{ user: User }>()
);


